from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from .models import StudentProfile, AlumniProfile,StudentImage

from .serializer import (
                         StudentProfileSerializer,
                         AlumniProfileSerializer,
                         StudendInfoSerializer,
                         StudentImageSerializer
                        )
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt  
from django.utils.decorators import method_decorator
from django.http import JsonResponse

# class StudentInfoListView(generics.ListAPIView):
#     serializer_class =StudendInfoSerializer
#     permission_classes=[IsAuthenticated]


class StudentInfoListView(generics.RetrieveAPIView):
    queryset = None
    serializer_class =StudendInfoSerializer
    permission_classes=[IsAuthenticated]
    def get_object(self):
        return self.request.user


# class ProfileImageView(generics.UpdateAPIView):
#     serializer_class = StudentImageSerializer
#     permission_classes=[IsAuthenticated]
#     parser_classes= [ MultiPartParser, FormParser]
#     def get_object(self):
#         student_profile, created = StudentProfile.objects.get_or_create(student=self.request.user)
#         return student_profile

class ProfileImageCreate(generics.ListCreateAPIView):
    queryset = StudentImage.objects.all()
    serializer_class = StudentImageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)
class ProfileImageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentImage.objects.all()
    serializer_class = StudentImageSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return StudentImage.objects.get(student=self.request.user)

    def perform_update(self, serializer):
        serializer.save(student=self.request.user)

class StudentProfileUpdateDestroyView(generics.UpdateAPIView):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    # permission_classes = [IsAuthenticated]

    # def get_object(self):
    #     queryset = self.get_queryset()
    #     obj = queryset.filter(student=self.request.user).first()  # Filter by current user
    #     return obj

    # def patch(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=True)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)
    #     return JsonResponse({'message': 'Profile updated successfully'})
    
    
    
# from .serializer import StudentRegistrationSerializer, AlumniRegistrationSerializer

    # views.py

# class StudentRegistrationView(APIView):
#         def post(self, request, *args, **kwargs):
#             serializer = StudentRegistrationSerializer(data=request.data)
#             if serializer.is_valid():
#                 # Set the authenticated user as the profile's user
#                 serializer.validated_data['student_profile']['user'] = request.user.id
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class AlumniRegistrationView(APIView):
#          def post(self, request, *args, **kwargs):
#             serializer = AlumniRegistrationSerializer(data=request.data)
#             if serializer.is_valid():
#                 # Set the authenticated user as the profile's user
#                 serializer.validated_data['alumni_profile']['user'] = request.user.id
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class StudentProfileCreateView(generics.ListCreateAPIView):
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(student=self.request.user)
    def get_queryset(self):
        return StudentProfile.objects.filter(student=self.request.user)
    # def get_object(self):
    #     return StudentProfile.objects.get(user=self.request.user)
    # def get_queryset(self):
    #     return StudentProfile.objects.all() 

# class StudentProfileUpdatedestroyView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = StudentProfileSerializer
#     permission_classes = [IsAuthenticated]
    
#     @method_decorator(csrf_exempt)  # Apply csrf_exempt decorator for testing purposes
#     def dispatch(self, request, *args, **kwargs):
#         print('Request Headers:', request.headers)

#         # If the content type is JSON, try to parse the request data as JSON
#         if 'application/json' in request.content_type:
#             try:
#                 data = request.body.decode('utf-8')  # Decode bytes to string
#                 print('Request Data:', data)
#             except Exception as e:
#                 print('Error parsing JSON data:', e)
#         else:
#             # If the content type is not JSON, print the raw request body
#             print('Raw Request Body:', request.body)

#         # Print user information
#         print('User:', request.user)

#         # Continue with the original dispatch method
#         return super().dispatch(request, *args, **kwargs)
    
    # def get_object(self):
    #     return StudentProfile.objects.get(user=self.request.user)
    # def get_queryset(self):
    #     return StudentProfile.objects.filter(user=self.request.user)

    # def get_object(self):
    #     queryset = self.get_queryset()
    #     obj = generics.get_object_or_404(queryset, pk=self.kwargs["pk"])
    #     print(obj)
    #     print(kwargs)
    #     self.check_object_permissions(self.request, obj)
    #     return obj



    
class AlumniProfileCreateView(generics.CreateAPIView):
    serializer_class = AlumniProfileSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(alumni=self.request.user)
    def get_object(self):
        return AlumniProfile.objects.get(alumni=self.request.user)
    # def get_queryset(self):
    #     return AlumniProfile.objects.all() 

class AlumniProfileUpdatedestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AlumniProfileSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return AlumniProfile.objects.get(alumni=self.request.user)
    
