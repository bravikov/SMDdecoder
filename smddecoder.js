function decode()
{
     document.getElementById('resultArea').innerHTML = document.getElementById('marking').value;
     document.getElementById('marking').focus();
}

function help()
{
     document.getElementById('resultArea').innerHTML = "������������ ���������� ����������"
                                                       "�������������� �������";
     document.getElementById('marking').focus();
}
