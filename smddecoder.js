function decode()
{
     document.getElementById('resultArea').innerHTML = document.getElementById('marking').value;
     document.getElementById('marking').focus();
}

function help()
{
     helpString = "������������ ���������� ����������."
     helpString += "<br>������� ����������:<ul>"
     helpString += "<li>123 (12 ���)</li>"
     helpString += "<li>1212 (12,1 ���, �������� 1%)</li></ul>";
     
     document.getElementById('resultArea').innerHTML = helpString;                                         
     document.getElementById('marking').focus();
}
