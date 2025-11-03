export class generatecard {
    async luhnVerification(num) {
        let digits = num.toString().split('').map(Number);
        let checkDigit = digits.pop();
        digits.reverse();

        let total = 0;
        for (let i = 0; i < digits.length; i++) {
            let digit = digits[i];
            if (i % 2 === 0) {
                digit *= 2;
            }
            if (digit > 9) {
                digit -= 9;
            }
            total += digit;
        }

        total *= 9;
        return (total % 10) === checkDigit;
    }

    async cc_gen(cc, mes = 'x', ano = 'x', cvv = 'x') {
        const ccs = [];
        const digits = '0123456789';

        while (ccs.length < 1) {
            let card = cc.toString();

            // Mezclar los dígitos
            let listDigits = digits.split('');
            for (let i = listDigits.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [listDigits[i], listDigits[j]] = [listDigits[j], listDigits[i]];
            }
            card += listDigits.join('');

            // Reemplazar 'x' con dígitos aleatorios
            let cardArray = card.split('');
            cardArray = cardArray.map(ch => ch === 'x' ? Math.floor(Math.random() * 10).toString() : ch);
            card = cardArray.join('');

            // Ajustar longitud de la tarjeta
            if (card[0] === '3') {
                card = card.slice(0, 15);
            } else {
                card = card.slice(0, 16);
            }

            // Generar mes
            let mesGen;
            if (mes === 'x') {
                mesGen = Math.floor(Math.random() * 12) + 1;
                mesGen = mesGen < 10 ? '0' + mesGen : mesGen.toString();
            } else {
                mesGen = mes.toString();
            }

            // Generar año
            let anoGen;
            if (ano === 'x') {
                anoGen = Math.floor(Math.random() * (2031 - 2023 + 1)) + 2023;
            } else {
                anoGen = ano.toString();
                if (anoGen.length === 2) {
                    anoGen = '20' + anoGen;
                }
            }

            // Generar CVV
            let cvvGen;
            if (cvv === 'x') {
                if (card[0] === '3') {
                    cvvGen = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                } else {
                    cvvGen = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
                }
            } else {
                cvvGen = cvv.toString();
            }

            const cardString = `${card}|${mesGen}|${anoGen}|${cvvGen}`;

            if (await this.luhnVerification(card)) {
                ccs.push(cardString);
            }
        }

        return ccs;
    }

    async gencard(serie) {
        let input = '';
        try {
            input = serie.split('|');
        } catch (err) {
            return {"result":"fail","card":"Invalid serie"};
        }
        let cc, mes, ano, cvv;

        if (input.length === 1) {
            cc = input[0];
            mes = 'x';
            ano = 'x';
            cvv = 'x';
        } else if (input.length === 2) {
            cc = input[0];
            mes = input[1].slice(0, 2);
            ano = 'x';
            cvv = 'x';
        } else if (input.length === 3) {
            cc = input[0];
            mes = input[1].slice(0, 2);
            ano = input[2];
            cvv = 'x';
        } else if (input.length === 4) {
            cc = input[0];
            mes = input[1].slice(0, 2);
            ano = input[2];
            cvv = input[3];
        } else {
            cc = input[0];
            mes = input[1].slice(0, 2);
            ano = input[2];
            cvv = input[3];
        }

        if (cc.length < 6) {
            return {"result":"fail","card":"Invalid bin"};
        }

        let ccsg = await this.cc_gen(cc, mes, ano, cvv);

        return {"result":"success","card":ccsg[0]};
    }
}