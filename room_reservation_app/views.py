from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView, Response
from django.core.serializers import serialize
import json
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED,
    HTTP_400_BAD_REQUEST
)
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ValidationError
from .userPermissions import UserPermissions
from .models import RoomAssignment, RoommateRequest, HousingRequest, Staff, Student, LegalGuardian
from .serializers import RoomAssignmentSerializer, RoommateRequestSerializer, HousingRequestSerializer, StaffSerializer, StudentSerializer, LegalGuardianSerializer

# View to get user 
class Get_User(UserPermissions):
    def get(self, request):
        return Response({"email": request.user.email})

# View to sign up as staff member
class Sign_Up_Staff(APIView):
    def post(self, request):
        email = request.data.get('email')
        print(email)
        if Staff.objects.filter(email=email).exists():
            return Response('An account with this email already exists.', status=HTTP_400_BAD_REQUEST)
        else:
            request.data['username'] = email
            user = Staff.objects.create_user(**request.data)
            token = Token.objects.create(user=user)
            return Response(
                {'user': user.email, 'token': token.key}, status=HTTP_201_CREATED
            )
    
# View to sign up as student
class Sign_Up_Student(APIView):
    def post(self, request):
        email = request.data.get('email')
        print(email)
        if Student.objects.filter(email=email).exists():
            return Response('An account with this email already exists.', status=HTTP_400_BAD_REQUEST)
        else:
            request.data['username'] = email
            user = Student.objects.create_user(**request.data)
            token = Token.objects.create(user=user)
            return Response(
                {'user': user.email, 'token': token.key}, status=HTTP_201_CREATED
            )

# View to login staff member
class Log_In_Staff(APIView):
    def post(self, request):
        email = request.data.get('email')
        print(email)
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        print(user)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.email, "id": user.id})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)
        
# View to login student
class Log_In_Student(APIView):
    def post(self, request):
        email = request.data.get('email')
        print(email)
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        print(user)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.email, "id": user.id})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)
        
# View to logout
class Log_Out(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    

# View for legal guardian
class Legal_Guardian(UserPermissions):
    # post method to create a legal guardian 
    def post(self, request):
        newLegalGuardian = Legal_Guardian(**request.data)
        newLegalGuardian.save()

        # serialize new legal guardian
        jsonNewLegalGuardian = LegalGuardianSerializer(newLegalGuardian).data

        return Response(jsonNewLegalGuardian)
    
    def get(self, request, studentID):
        # get the student object with the student id
        student = get_object_or_404(Student, id=studentID)

        # get the legal guardian associated with the student
        legal_guardian = student.legalGuardian

         # Check if a legal guardian is associated with the student
        if legal_guardian:
            # Serialize the legal guardian data
            serializedLegalGuardian = LegalGuardianSerializer(legal_guardian).data
            return Response(serializedLegalGuardian)
        else:
            # Return a response indicating that no legal guardian is associated with the student
            return Response({'error': 'No legal guardian found for the student.'}, status=HTTP_404_NOT_FOUND)

    