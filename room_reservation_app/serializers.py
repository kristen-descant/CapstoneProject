from rest_framework import serializers # import serializers from DRF
from .models import Staff, Student, LegalGuardian, HousingRequest, RoommateRequest, RoomAssignment

class RoomAssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = RoomAssignment
        fields = ["id", "createdDate", "startDate", "endDate", "buildingNumber", "roomNumber", "costPerSemester", "balanceDue"]

class StaffSerializer(serializers.ModelSerializer):

    roomAssignment = RoomAssignmentSerializer() # User serializer to get json data for roomAssignment

    class Meta:
        model = Staff
        fields = ["id", "fullName", "phoneNumber", "email", "roomAssignment", "title"]

class LegalGuardianSerializer(serializers.ModelSerializer):

    students = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = LegalGuardian
        fields = ["id", "fullName", "fullAddress", "phoneNumber", "email", "students"]     

class StudentSerializer(serializers.ModelSerializer):

    housingRequest = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    roomAssignment = RoomAssignmentSerializer() # Use serializer to get json data for roomAssignment
    legalGuardian = LegalGuardianSerializer() # Use serializer to get json data from legalGuardian

    class Meta:
        model = Student
        fields = ["id", "fullName", "phoneNumber", "email", "roomAssignment", "legalGuardian", "housingRequest"]


class HousingRequestSerializer(serializers.ModelSerializer):

    student = StudentSerializer() # Use serializer to get json data for student
    class Meta:
        model = HousingRequest
        fields = ["id", "createdDate", "buildingNumber", "unitSize", "floor", "accessible", "student"]

class RoommateRequestSerializer(serializers.ModelSerializer):

    housingRequest = HousingRequestSerializer() # Use serializer to get json data for housingRequest
    
    class Meta:
        model = RoommateRequest
        fields = ["id", "createdDate", "roommateFullName", "roommateEmail", "roommateGrade", "housingRequest"]
