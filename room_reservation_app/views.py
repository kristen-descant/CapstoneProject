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
from .models import RoomAssignment, RoommateRequest, HousingRequest, Staff, Student, LegalGuardian, AppUser
from .serializers import RoomAssignmentSerializer, RoommateRequestSerializer, HousingRequestSerializer, StaffSerializer, StudentSerializer, LegalGuardianSerializer

class Get_User(UserPermissions):
    def get(self, request):
        user = get_object_or_404(AppUser, id=request.user.id)
        if hasattr(user, 'student'):
            # User is a student
            return Response({"email": user.email, "fullName": user.fullName, "type": "student", "id": user.id})
        else:
            # User is not a student (staff or other)
            return Response({"email": user.email, "fullName": user.fullName, "type": "staff", "id": user.id})

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
                {'user': user.email, "fullName": user.fullName, 'token': token.key, "id": user.id}, status=HTTP_201_CREATED
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
                {'user': user.email, "fullName": user.fullName, 'token': token.key, "id": user.id}, status=HTTP_201_CREATED
            )

# View to login staff member
class Log_In_Staff(APIView):
    def post(self, request):
        email = request.data.get('email')
        print(email)
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        print(user)
        if user and hasattr(user, 'staff'):
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "fullName": user.fullName, "user": user.email, "id": user.id})
        elif user and hasattr(user, 'student'):
            return Response("This user is not a staff. Log in as student", status=HTTP_401_UNAUTHORIZED)
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
        if user and hasattr(user, 'student'):
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "fullName": user.fullName, "user": user.email, "id": user.id})
        elif user and hasattr(user, 'staff'):
            return Response("This user is not a student. Log in as staff", status=HTTP_401_UNAUTHORIZED)
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
    def post(self, request, id):
        student = get_object_or_404(Student, id=id)
        newLegalGuardian = LegalGuardian.objects.create(**request.data)
        newLegalGuardian.student = student
        newLegalGuardian.save()

        # serialize new legal guardian
        jsonNewLegalGuardian = LegalGuardianSerializer(newLegalGuardian).data

        return Response(jsonNewLegalGuardian)
    
    # get a legal guardian
    def get(self, request, id):
        
        legal_guardian = get_object_or_404(Legal_Guardian, id=id)
         # Check if a legal guardian is associated with the student
        if legal_guardian:
            # Serialize the legal guardian data
            serializedLegalGuardian = LegalGuardianSerializer(legal_guardian).data
            return Response(serializedLegalGuardian)
        else:
            # Return a response indicating that no legal guardian is associated with the student
            return Response({'error': 'No legal guardian found for the student.'}, status=HTTP_404_NOT_FOUND)

    # delete legal guardian    
    def delete(self, request, id):
        legal_guardian = get_object_or_404(LegalGuardian, id=id)
        legal_guardian.delete()

        return Response(status=HTTP_204_NO_CONTENT)

    # update legal guardian
    def put(self, request, id):
        legal_guardian = get_object_or_404(LegalGuardian, id=id)

        json_legal_guardian = LegalGuardianSerializer(legal_guardian, data=request.data, partial=True)
        if json_legal_guardian.is_valid():
            json_legal_guardian.save()
            return Response(json_legal_guardian.data, status=HTTP_204_NO_CONTENT)
        else:
            return Response(json_legal_guardian.errors, status=HTTP_400_BAD_REQUEST)

# view to create a housing request        
class Create_Housing_Request(UserPermissions):

    def post(self, request):
        print(request.user)
        user = get_object_or_404(AppUser, id=request.user.id)
        print(user)
        new_housing = HousingRequest.objects.create(
            createdDate=request.data.get('createdDate'),
            buildingNumber=request.data.get('buildingNumber'),
            unitSize=request.data.get('unitSize'),
            floor=request.data.get('floor'),
            accessible=request.data.get('accessible'),
            user=user  # Assign the user to the housing request
        )
        new_housing.save()

        # serialize new legal guardian
        json_housing = HousingRequestSerializer(new_housing).data

        return Response(json_housing)

# View to get, delete, or update the users housing request        
class A_Housing_Request(UserPermissions):

    def get(self, request, id):
            housing_requests = HousingRequest.objects.filter(user=id)
            if housing_requests.exists():
                json_housing = HousingRequestSerializer(housing_requests, many=True)
                return Response(json_housing.data)
            else:
                return Response({"message": "No housing requests found for this user."}, status=404)
    
    def delete(self, request, id):
        housing_req = get_object_or_404(HousingRequest, id=id)
        housing_req.delete()

        return Response(status=HTTP_204_NO_CONTENT)

    def put(self, request, id):
        housing_req = get_object_or_404(HousingRequest, id=id)

        json_housing_req = HousingRequestSerializer(housing_req, data=request.data, partial=True)
        if json_housing_req.is_valid():
            json_housing_req.save()
            return Response(json_housing_req.data, status=HTTP_204_NO_CONTENT)
        else:
            return Response(json_housing_req.errors, status=HTTP_400_BAD_REQUEST)

# View to get all housing request
class All_Housing_Requests(UserPermissions):

    def get(self, request):
        housing_request = HousingRequest.objects.order_by('-createdDate')
        json_housing = HousingRequestSerializer(housing_request, many=True)
        return Response(json_housing.data)

# View to create a roommate request  
class Create_Roomate_Request(UserPermissions):

    def post(self, request):
        print(request.user)
        user = get_object_or_404(AppUser, id=request.user.id)
        print(user)
        new_roommate = RoommateRequest.objects.create(
            createdDate=request.data.get('createdDate'),
            roommateFullName = request.data.get('roommateFullName'),
            roommateEmail = request.data.get('roommateEmail'),
            roommateGrade = request.data.get('roommateGrade'),
            user=user  # Assign the user to the housing request
        )
        new_roommate.save()

        # serialize new legal guardian
        json_rommate = RoommateRequestSerializer(new_roommate).data

        return Response(json_rommate)

# View to get, delete, or update the roommate request    
class A_Roommate_Request(UserPermissions):

    def get(self, request, id):
        roommate_requests = RoommateRequest.objects.filter(user=id)
        if roommate_requests.exists():
            json_roommates = RoommateRequestSerializer(roommate_requests, many=True)
            return Response(json_roommates.data)
        else:
            return Response({"message": "No roommate requests found for this user."}, status=404)
    
    def delete(self, request, id):
        roommate_req = get_object_or_404(RoommateRequest, id=id)
        roommate_req.delete()

        return Response(status=HTTP_204_NO_CONTENT)

    def put(self, request, id):
        roommate_req = get_object_or_404(RoommateRequest, id=id)

        json_roomate_req = RoommateRequestSerializer(roommate_req, data=request.data, partial=True)
        if json_roomate_req.is_valid():
            json_roomate_req.save()
            return Response(json_roomate_req.data, status=HTTP_204_NO_CONTENT)
        else:
            return Response(json_roomate_req.errors, status=HTTP_400_BAD_REQUEST)


# View to get all roommate request        
class All_Roommate_Requests(UserPermissions):

    def get(self, request):
        roommate_requests = RoommateRequest.objects.order_by('-createdDate')
        json_roommate_request = RoommateRequestSerializer(roommate_requests, many=True)
        return Response(json_roommate_request.data)


# View to create a room assignment
class Create_Room_Assignment(UserPermissions):

    def post(self, request):
        user_id = request.data.get('appUser')
        print(user_id)
        user = get_object_or_404(AppUser, id=user_id)
        print(user)
        room_assignment_data = {
            'createdDate': request.data.get('createdDate'),
            'startDate': request.data.get('startDate'),
            'endDate': request.data.get('endDate'),
            'buildingNumber': request.data.get('buildingNumber'),
            'roomNumber': request.data.get('roomNumber'),
            'costPerSemester': request.data.get('costPerSemester'),
            'balanceDue': request.data.get('balanceDue')
        }

        # Create RoomAssignment instance
        new_room_assignment = RoomAssignment.objects.create(
            **room_assignment_data,
        )

        user.roomAssignment = new_room_assignment

        new_room_assignment.save()
        user.save()

        # serialize new legal guardian
        json_room_assignment = RoomAssignmentSerializer(new_room_assignment).data

        return Response(json_room_assignment)
    
# View to read or delete a room assignment
class Admin_Room_Assignment(UserPermissions):
    
    def get(self, request, id):
        user = get_object_or_404(AppUser, id=id)
        print(user)
        print(user.roomAssignment)
        room_assignment = user.roomAssignment
        json_room_assignment = RoomAssignmentSerializer(room_assignment)
        
        return Response(json_room_assignment.data)
    
    def delete(self, request, id):
        room_assignment = get_object_or_404(RoomAssignment, appUser=id)
        room_assignment.delete()

        return Response(status=HTTP_204_NO_CONTENT)

    def put(self, request, id):
        room_assignment = get_object_or_404(RoomAssignment, appUser=id)

        json_roomate_req = RoomAssignmentSerializer(room_assignment, data=request.data, partial=True)
        if json_roomate_req.is_valid():
            json_roomate_req.save()
            return Response(json_roomate_req.data, status=HTTP_204_NO_CONTENT)
        else:
            return Response(json_roomate_req.errors, status=HTTP_400_BAD_REQUEST)
