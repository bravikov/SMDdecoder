function decode()
{
     document.getElementById('resultArea').innerHTML = document.getElementById('marking').value;
     document.getElementById('marking').focus();
}

function help()
{
     helpString = "–асшифровщик маркировок резисторов."
     helpString += "<br>ѕримеры маркировок:<ul>"
     helpString += "<li>123 (12 кќм)</li>"
     helpString += "<li>1212 (12,1 кќм, тосность 1%)</li></ul>";
     
     document.getElementById('resultArea').innerHTML = helpString;                                         
     document.getElementById('marking').focus();
}
