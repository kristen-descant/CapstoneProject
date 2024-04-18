from django.urls import path
from .views import Sign_Up_Staff, Sign_Up_Student, Log_In_Staff, Log_In_Student, Log_Out, Get_User

urlpatterns = [
    path('user/', Get_User.as_view(), name='get_user'),
    path('signupstaff/', Sign_Up_Staff.as_view(), name='signupstaff'),
    path('signupstudent/', Sign_Up_Student.as_view(), name='signupstudent'),
    path('loginstaff/', Log_In_Staff.as_view(), name='loginstaff'),
    path('loginstudent/', Log_In_Student.as_view(), name='loginstudent'),
    path('logout/', Log_Out.as_view(), name='logout'),
]