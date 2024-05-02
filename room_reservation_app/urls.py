from django.urls import path
from .views import (Sign_Up_Staff, Sign_Up_Student, Log_In_Staff, Log_In_Student, Log_Out, Get_User,
                     Legal_Guardian, Create_Housing_Request, A_Housing_Request, All_Housing_Requests,
                     Create_Roomate_Request, A_Roommate_Request, All_Roommate_Requests, Create_Room_Assignment,
                     Admin_Room_Assignment, All_Users)

urlpatterns = [
    path('users/', Get_User.as_view(), name='get_user'),
    path('signupstaff/', Sign_Up_Staff.as_view(), name='signupstaff'),
    path('signupstudent/', Sign_Up_Student.as_view(), name='signupstudent'),
    path('loginstaff/', Log_In_Staff.as_view(), name='loginstaff'),
    path('loginstudent/', Log_In_Student.as_view(), name='loginstudent'),
    path('logout/', Log_Out.as_view(), name='logout'),
    path('legalguardian/<int:id>/', Legal_Guardian.as_view(), name='legalguardian'),
    path('createhousingreq/', Create_Housing_Request.as_view(), name='createhousingreq'),
    path('housingreq/<int:id>/', A_Housing_Request.as_view(), name='housingreq'),
    path('allhousing/', All_Housing_Requests.as_view(), name='allhousing'),
    path('createroommatereq/', Create_Roomate_Request.as_view(), name='createroommatereq'),
    path('roommatereq/<int:id>', A_Roommate_Request.as_view(), name='roommatereq'),
    path('allroommatereq/', All_Roommate_Requests.as_view(), name='allroommatereq'),
    path('createroomassignment/', Create_Room_Assignment.as_view(), name='createroomassignment'),
    path('adminroomassignments/<int:id>', Admin_Room_Assignment.as_view(), name='adminroomassignmetns'),
    path('searchtenants/', All_Users.as_view(), name='searchstudents')
]