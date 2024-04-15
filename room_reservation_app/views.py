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
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ValidationError
from utilities.userPermissions import UserPermissions
from models import RoomAssignment, RoommateRequest, HousingRequest, Staff, Student, LegalGuardian

# Create your views here.
