/* Разбивает число на 2 части: мантиссу, модуль которой лежит в
интервале[1;1000) и степень десяти с показателем кратным 3.
Возвращает объекте c полями mantissa, powerOfTen и exponent,
которое содержит показатель числа powerOfTen кратный трем. */
function getNumberInEngineeringNotation(number)
{
    var result = {mantissa: 0, powerOfTen: 0, exponent: 0};

    if (typeof(number) != 'number') {
        return result;
    }

    if (number == 0) {
        return result;
    }

    var m = number;
    var e = 0;

    while (Math.abs(m) >= 1000) {
        m /= 1000;
        e += 3;
    }

    while (Math.abs(m) < 1) {
        m *= 1000;
        e -= 3;
    }

    result.mantissa = m;
    result.powerOfTen = number / m;
    result.exponent = e;

    return result;
}

/* Разбивает число на 2 части: мантиссу, модуль которой лежит в
интервале[1;10) и степень десяти с целым показателем.
Возвращает объекте c полями mantissa, powerOfTen и exponent,
которое содержит целый показатель числа powerOfTen. */
function getNumberInScientificNotation(number)
{
    var result = {mantissa: 0, powerOfTen: 0, exponent: 0};

    if (typeof(number) != 'number') {
        return result;
    }

    if (number == 0) {
        return result;
    }

    var m = number;
    var e = 0;

    while (Math.abs(m) >= 10) {
        m /= 10;
        e++;
    }

    while (Math.abs(m) < 1) {
        m *= 10;
        e--;
    }

    result.mantissa = m;
    result.powerOfTen = number / m;
    result.exponent = e;

    return result;
}

/* Вернет true если number - целое число, иначе false */
function isInteger(number) {
    if (typeof(number) != 'number') {
        return false;
    }

    var integer = number ^ 0;

    if (integer == number) {
        return true;
    }
    else {
        return false;
    }
}

/* Возвращает русское обозначение приставки СИ
для степеней числа 10.
Аргумент - целый показатель степени десять от -24 до 24 включительно.
Возвращает "none", если приставки несуществует
или недопустимый аргумент. */
function getRussianMetricPrefix(exponent)
{
    var none = "none";

    if (typeof(exponent) != 'number') {
        return none;
    }

    if (!isInteger(exponent)) {
        return none;
    }

    if (exponent < -24 || exponent > 24) {
        return none;
    }

    var prefix = ["и"  /* иокто, -24 */, none, none,
                  "з"  /* зепто, -21 */, none, none,
                  "а"  /* атто,  -18 */, none, none,
                  "ф"  /* фемто, -15 */, none, none,
                  "п"  /* пико,  -12 */, none, none,
                  "н"  /* нано,   -9 */, none, none,
                  "мк" /* микро,  -6 */, none, none,
                  "м"  /* мили,   -3 */,
                  "с"  /* санти,  -2 */,
                  "д"  /* деци,   -1 */,
                  ""   /* -,       0 */,
                  "да" /* дека,    1 */,
                  "г"  /* гекто,   2 */,
                  "к"  /* кило,    3 */, none, none,
                  "М"  /* мега,    6 */, none, none,
                  "Г"  /* гига,    9 */, none, none,
                  "Т"  /* тера,   12 */, none, none,
                  "П"  /* пета,   15 */, none, none,
                  "Э"  /* экса,   18 */, none, none,
                  "З"  /* зетта,  21 */, none, none,
                  "И"  /* иотта,  24 */];

    return prefix[exponent + 24];
}

/* Функция решает систему уравнений {p = u * i, u = i * r }
с двумя неизвестными и возвращает объект с полями p, i, u и r.
var1 и var2 задают имена переменных ("p", "u", "i", "r"),
val1 и val2 задают значения этих переменных. */
function solvePUIR(var1, val1, var2, val2)
{
    var result = {p:0, u:0, i:0, r:0};

    var p = 0; u = 0; i = 0; r = 0;

    if (typeof(val1) != 'number' || typeof(val2) != 'number') {
        return result;
    }

    switch (var1) {
        case "p": p = val1; break;
        case "u": u = val1; break;
        case "i": i = val1; break;
        case "r": r = val1; break;
        default: return result;
    }

    switch (var2) {
        case "p": p = val2; break;
        case "u": u = val2; break;
        case "i": i = val2; break;
        case "r": r = val2; break;
        default: return result;
    }

    var rt = Math.sqrt; // rt - root (корень)

    do {
        if (u != 0 && i != 0) {p = u * i;       r = u / i;     break;}
        if (u != 0 && r != 0) {p = u * u / r;   i = u / r;     break;}
        if (u != 0 && p != 0) {r = u * u / p;   i = p / u;     break;}
        if (i != 0 && r != 0) {p = i * i * r;   u = i * r;     break;}
        if (i != 0 && p != 0) {r = p / (i * i); u = p / i;     break;}
        if (r != 0 && p != 0) {u = rt(p * r);   i = rt(p / r); break;}
    } while(0);

    result.p = p;
    result.u = u;
    result.i = i;
    result.r = r;

    return result;
}

// Возвращает номинал с индексом n из номиналного ряда с N элементами.
// N - элементов в ряду [3, 6, 12, 24, 48, 96, 192].
// n - номер элемента [0; N-1].
// Если аргументы недопустимы, то вернет 0.
function getNominalMantissa(N, n)
{
    if (typeof(n) != 'number' || typeof(N) != 'number') {
        return 0;
    }

    var possibleN = new Array(3, 6, 12, 24, 48, 96, 192);
    var N_isValid = false;
    for (var i = 0; i < possibleN.length; ++i) {
        if (N == possibleN[i]) {
            N_isValid = true;
            break;
        }
    }

    if (N_isValid == false || n >= N) {
        return 0;
    }

    if (N <= 24) {
        var E24 = new Array(1.0, 1.1, 1.2, 1.3, 1.5, 1.6,
                            1.8, 2.0, 2.2, 2.4, 2.7, 3.0,
                            3.3, 3.6, 3.9, 4.3, 4.7, 5.1,
                            5.6, 6.2, 6.8, 7.5, 8.2, 9.1);

        switch(N) {
            case 3:  return E24[n*8];
            case 6:  return E24[n*4];
            case 12: return E24[n*2];
            case 24: return E24[n*1];
            default: return 0;
        }
    }
    else {
         return Math.round(100 * Math.pow(10, n/N)) / 100;
    }
}

// Возвращает два соседних номинальных значения для числа number.
// N - элементов в номинальном ряду [3, 6, 12, 24, 48, 96, 192].
// number - число для для которого ищутся соседние номиналы
function getNeighboringNominalValues(N, number)
{
    var nominalValues = [0, 0];

    if (typeof(number) != 'number') {
        return nominalValues;
    }

    if (getNominalMantissa(N, 0) == 0) {
        return nominalValues;
    }

    if (number < 0) {
        return nominalValues;
    }

    var n = getNumberInScientificNotation(number);
    var numberMantissa = n.mantissa;
    var numberPowerOfTen = n.powerOfTen;

    if (numberMantissa == 0) {
        return nominalValues;
    }

    for (var n = 0; n < N; ++n) {
        var nominalMantissa = getNominalMantissa(N, n);

        if (numberMantissa > nominalMantissa) {
            var last_n = N - 1;

            if (n == last_n) {
                nominalValues[0] = numberPowerOfTen * nominalMantissa;
                nominalValues[1] = numberPowerOfTen * 10 * getNominalMantissa(N, 0);
            }

            continue;
        }

        if (numberMantissa == nominalMantissa) {
            nominalValues[1] = nominalValues[0] = numberPowerOfTen * nominalMantissa;
            break;
        }

        var previous_n = n - 1;
        if (previous_n < 0) {
            previous_n = 0;
        }

        nominalValues[0] = numberPowerOfTen * getNominalMantissa(N, previous_n);
        nominalValues[1] = numberPowerOfTen * nominalMantissa;
        break;
    }

    return nominalValues;
}

/* Возвращает число number округленное до precision знаков после запятой */
function round(number, precision) {
    precision = precision || 0;
    return Math.round(number*Math.pow(10, precision)) / Math.pow(10, precision);
}
