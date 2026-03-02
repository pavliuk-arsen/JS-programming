console.log(`
ІНСТРУКЦІЯ З ВИКОРИСТАННЯ ФУНКЦІЇ triangle():

Функція приймає 4 аргументи: значення1, "тип1", значення2, "тип2".
Приклад: triangle(3, "leg", 4, "leg");

Допустимі типи аргументів:
 - "leg"            : катет
 - "hypotenuse"     : гіпотенуза
 - "adjacent angle" : прилеглий до катета кут (у градусах)
 - "opposite angle" : протилежний до катета кут (у градусах)
 - "angle"          : гострий кут, коли задана гіпотенуза (у градусах)

Порядок аргументів не важливий.
`);

function triangle(val1, type1, val2, type2) {
    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Помилка: Невірний тип аргументу. Будь ласка, прочитайте інструкцію.");
        return "failed";
    }

    if (typeof val1 !== 'number' || typeof val2 !== 'number' || val1 <= 0 || val2 <= 0) {
        console.log("Zero or negative input");
        return "Zero or negative input";
    }

    const toRad = deg => deg * (Math.PI / 180);
    const toDeg = rad => rad * (180 / Math.PI);

    let a, b, c, alpha, beta;

    if (type1 === "leg" && type2 === "leg") {
        a = val1;
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDeg(Math.atan(a / b));
        beta = 90 - alpha;
    } 
    else if ((type1 === "hypotenuse" && type2 === "leg") || (type1 === "leg" && type2 === "hypotenuse")) {
        let hyp = (type1 === "hypotenuse") ? val1 : val2;
        let leg = (type1 === "leg") ? val1 : val2;

        if (leg >= hyp) {
            console.log("Помилка: Катет не може бути більшим або дорівнювати гіпотенузі.");
            return "failed";
        }

        a = leg;
        c = hyp;
        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    }
    else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
        let hyp = (type1 === "hypotenuse") ? val1 : val2;
        let ang = (type1 === "angle") ? val1 : val2;

        if (ang >= 90) {
            console.log("Кут має бути гострим(< 90)");
            return "failed";
        }

        c = hyp;
        alpha = ang;
        beta = 90 - alpha;
        a = c * Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
    }
    else if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) {
        let leg = (type1 === "leg") ? val1 : val2;
        let adjAngle = (type1 === "adjacent angle") ? val1 : val2;

        if (adjAngle >= 90) {
            console.log("Angle must be acute (< 90)");
            return "failed";
        }

        a = leg;
        beta = adjAngle;
        alpha = 90 - beta;
        
        c = a / Math.cos(toRad(beta));
        b = Math.sqrt(c * c - a * a);
    }
    else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
        let leg = (type1 === "leg") ? val1 : val2;
        let oppAngle = (type1 === "opposite angle") ? val1 : val2;

        if (oppAngle >= 90) {
            console.log("Кут має бути гострим(< 90)");
            return "failed";
        }

        a = leg;
        alpha = oppAngle;
        beta = 90 - alpha;

        c = a / Math.sin(toRad(alpha));
        b = Math.sqrt(c * c - a * a);
    }
    else {
        console.log("Помилка: Несумісна пара типів аргументів. Перечитайте інструкцію.");
        return "failed";
    }

    if (a + b <= c || a + c <= b || b + c <= a) {
        console.log("Помилка: Такий трикутник не може існувати (порушено нерівність трикутника).");
        return "failed";
    }

    console.log("a = " + a);
    console.log("b = " + b);
    console.log("c = " + c);
    console.log("alpha = " + alpha);
    console.log("beta = " + beta);

    return "success";
}