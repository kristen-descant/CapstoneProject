from django.db import models
# Import AbstractUser to add fields to user classes
from django.contrib.auth.models import AbstractUser

# Create your models here.
class RoomAssignment(models.Model): 
    createdDate = models.DateField()
    startDate = models.DateField()
    endDate = models.DateField()
    buildingNumber = models.IntegerField()
    roomNumber = models.IntegerField()
    costPerSemester = models.DecimalField(max_digits=10, decimal_places=2)
    balanceDue = models.DecimalField(max_digits=10, decimal_places=2)

class AppUser(AbstractUser):    # Base user for Staff and Student to inherit
    fullName = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=255)
    email = models.EmailField(verbose_name='email address', unique=True) 
    password = models.CharField(max_length=128)  
    roomAssignment = models.OneToOneField(RoomAssignment, related_name = 'appUser', on_delete=models.CASCADE, null=True, blank=True)

    USERNAME_FIELD = 'email' # Username will be email address
    REQUIRED_FIELDS= []

class Staff(AppUser):
    title = models.CharField(max_length=255)

class LegalGuardian(models.Model):
    fullName = models.CharField(max_length=255)
    fullAddress = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=255)
    email = models.EmailField(verbose_name='email address', unique=True)

class Student(AppUser):
    legalGuardian = models.ForeignKey(LegalGuardian, related_name="students", on_delete=models.CASCADE, null=True, blank=True) 

class HousingRequest(models.Model):
    createdDate = models.DateField(null=True, blank=True)
    buildingNumber = models.IntegerField(null=True, blank=True)
    unitSize = models.IntegerField(null=True, blank=True)
    floor = models.IntegerField(null=True, blank=True)
    accessible = models.BooleanField(null=True, blank=True)
    student = models.ForeignKey(Student, related_name="housingRequests", on_delete=models.CASCADE)

class RoommateRequest(models.Model):
    createdDate = models.DateField()
    roommateFullName = models.CharField(max_length=255)
    roommateEmail = models.EmailField()
    roommateGrade = models.CharField(max_length=100)
    housingRequest = models.OneToOneField(HousingRequest, related_name = 'roommateRequest', on_delete=models.CASCADE, null=True, blank=True)





