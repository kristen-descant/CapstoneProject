from rest_framework import serializers # import serializers from DRF
from .models import Staff, Student, LegalGuardian, HousingRequest, RoommateRequest, RoomAssignment, AppUser

class RoomAssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = RoomAssignment
        fields = ["id", "createdDate", "startDate", "endDate", "buildingNumber", "roomNumber", "costPerSemester", "balanceDue"]

class StaffSerializer(serializers.ModelSerializer):

    roomAssignment = RoomAssignmentSerializer() # User serializer to get json data for roomAssignment
    housingRequest = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Staff
        fields = ["id", "fullName", "phoneNumber", "email", "roomAssignment", "title", "housingRequest"]

    def get_housingRequest(self, obj):
        return [houseReq.id for houseReq in obj.housingRequest.all()]

class LegalGuardianSerializer(serializers.ModelSerializer):

    students = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = LegalGuardian
        fields = ["id", "fullName", "fullAddress", "phoneNumber", "email", "students"]    

class AppUserSerializer(serializers.ModelSerializer):

    roomAssignment = RoomAssignmentSerializer() # User serializer to get json data for roomAssignment
    housingRequest = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = AppUser
        fields = ["id", "fullName", "phoneNumber", "email", "roomAssignment", "housingRequest"]

    def get_housingRequest(self, obj):
        return [houseReq.id for houseReq in obj.housingRequest.all()]

class StudentSerializer(serializers.ModelSerializer):

    housingRequest = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    roomAssignment = RoomAssignmentSerializer() # Use serializer to get json data for roomAssignment
    legalGuardian = LegalGuardianSerializer() # Use serializer to get json data from legalGuardian

    class Meta:
        model = Student
        fields = ["id", "fullName", "phoneNumber", "email", "roomAssignment", "legalGuardian", "housingRequest"]

    def get_housingRequest(self, obj):
        return [houseReq.id for houseReq in obj.housingRequest.all()]


class HousingRequestSerializer(serializers.ModelSerializer):

    user = AppUserSerializer()

    class Meta:
        model = HousingRequest
        fields = ["id", "createdDate", "buildingNumber", "unitSize", "floor", "accessible", "user"]

class RoommateRequestSerializer(serializers.ModelSerializer):

    housingRequest = HousingRequestSerializer() # Use serializer to get json data for housingRequest
    user = AppUserSerializer()
    
    class Meta:
        model = RoommateRequest
        fields = ["id", "createdDate", "roommateFullName", "roommateEmail", "roommateGrade", "housingRequest", "user"]
