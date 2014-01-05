function decode()
{
     var markingStr = document.getElementById('marking').value;
     
     var regExp = [];
     
     regExp[0] = /^([0-9])([0-9])([0-9])$/;
     regExp[1] = /^([0-9])([0-9])([0-9])([0-9])$/;
     regExp[2] = /^([0-9])([0-9])([A-FSRX])$/;
     regExp[3] = /^([A-FSRX])([0-9])([0-9])$/;
     
     var charCod = {S: 0.01, X: 0.1, R: 0.1, A: 1, B: 10, C: 100, D: 1000, E: 10000, F: 100000};
     
     var NNC_NN_to_Mantis = [100, 102, 105, 107, 110, 113, 115, 118, 121, 124, 127, 130, 133, 137, 140, 143, 147, 150, 154, 158, 162, 165, 169, 174, 178, 182, 187, 191, 196, 200, 205, 210, 215, 221, 226, 232, 237, 243, 249, 255, 261, 267, 274, 280, 287, 294, 301, 309, 316, 324, 332, 340, 348, 357, 365, 374, 383, 392, 402, 412, 422, 432, 442, 453, 464, 475, 487, 499, 511, 523, 536, 549, 562, 576, 590, 604, 619, 634, 649, 665, 681, 698, 715, 732, 750, 768, 787, 806, 825, 845, 866, 887, 909, 931, 953, 976];
     
     var CNN_NN_to_Mantis = [100, 110, 120, 130, 150, 160, 180, 200, 220, 240, 270, 300, 330, 360, 390, 430, 470, 510, 560, 620, 680, 750, 820, 910, 100, 110, 120, 130, 150, 160, 180, 200, 220, 240, 270, 300, 330, 360, 390, 430, 470, 510, 560, 620, 680, 750, 820, 910, 100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820];
     
        var mc;
        var decodeStr;
        
        for (i = 0; i < 4; i++)
        {
                mc = regExp[i].exec(markingStr);
                if (mc == null) continue;
        
                var resistance;
                switch(i)
                {
                        case 0:
                        {
                                resistance = Math.pow(10,mc[3]) * (mc[1] + mc[2]);
                                break;
                        }
                        case 1:
                        {
                                resistance = Math.pow(10,mc[4]) * (mc[1] + mc[2] + mc[3]);
                                break;
                        }
                        case 2:
                        {
                                var NN = (mc[1]+mc[2])-1;
                                if(NN < 0 || NN >= 96) break;
                                resistance = charCod[mc[3]] * NNC_NN_to_Mantis[NN];
                                break;
                        }
                        case 3:
                        {
                                var NN = (mc[2]+mc[3])-1;
                                if(NN < 0 || NN >= 60) break;
                                resistance = charCod[mc[1]] * CNN_NN_to_Mantis[NN];
                                break;
                        }
                }
                if (resistance == undefined) break;
                
                var prefixIndex;
                for(prefixIndex = 0; prefixIndex <= 3; prefixIndex++)
                {
                        var temp = resistance/1000;
                        if (temp < 1) break;
                        resistance = temp;
                }
                
                var prefixs = ["", "к", "М", "Г"];
                
                decodeStr = resistance + " " + prefixs[prefixIndex] + "Ом";
                break;
     }
        if (decodeStr == undefined)
                decodeStr = "Не удалось распознать маркировку";
        
        document.getElementById('resultArea').innerHTML = decodeStr;
        document.getElementById('marking').focus();
}

function help()
{
     helpString = 'Расшифровщик маркировок <a href="http://ru.wikipedia.org/wiki/Резистор">резисторов</a> поверхностного монтажа.'
     helpString += "<br>Введите маркировку в единсвенное поле ввода на странице и нажмите Enter."
     helpString += "<br>Примеры маркировок:<ul>"
     helpString += "<li>123 (12 кОм)</li>"
     helpString += "<li>1212 (12,1 кОм)</li>"
     helpString += "<li>80E (6,65 МОм)</li>"
     helpString += "<li>D60 (820 кОм)</li>"
     helpString += "</ul>"
     helpString += 'Сайт разработки: <a href="http://github.com/bravikov/SMDdecoder">http://github.com/bravikov/SMDdecoder</a>';
     helpString += '<br>Автор: bravikov@gmail.com'
     
     document.getElementById('resultArea').innerHTML = helpString;                                     
     document.getElementById('marking').focus();
}
