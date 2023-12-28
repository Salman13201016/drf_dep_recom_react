
import re
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from datetime import datetime, timedelta
import random
from . import models 
from django.core.signing import Signer, BadSignature
from django.core.mail import send_mail
from django.utils.html import format_html
from . models import user_register
from rest_framework import serializers
from rest_framework import viewsets



from .serializers import UserIndexPanelSerializer

class UserIndexPanelView(viewsets.GenericViewSet):
    serializer_class = UserIndexPanelSerializer

    def user_index_panel(self, request):
        all_data = user_register.objects.all().order_by('pk')
        if len(all_data) == 0:
            status = False
        else:
            status = True

        msg = messages.get_messages(request)
        data = {'all_data': all_data, 'status': status, 'msg': msg}
        serializer = self.get_serializer(data)
        return render(request, 'update_design/signup.html', serializer.data)

from .serializers import SignUpSerializer, LoginAuthSerializer, LogoutAuthSerializer, CsrfFailureSerializer
from .models import user_register

class SignUpView(viewsets.ModelViewSet):
    serializer_class = SignUpSerializer
    queryset = user_register.objects.all()

from rest_framework import generics
from .serializers import EmailGeneratorSerializer
from rest_framework.response import Response
from rest_framework import status

class EmailGeneratorView(generics.CreateAPIView):
    serializer_class = EmailGeneratorSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        encrypted_value1, formatted_link = serializer.email_generator(serializer.validated_data)

        return Response({"encrypted_value": encrypted_value1, "formatted_link": formatted_link}, status=status.HTTP_200_OK)
    
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import EmailVerificationSerializer, AuthUserIndexSerializer, TermsOfUseSerializer, PrivacyPolicySerializer
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import user_register  # Import your user_register model
from .serializers import EmailVerificationSerializer  # Import your serializer

class EmailVerificationView(APIView):
    serializer_class = EmailVerificationSerializer

    def get(self, request, *args, **kwargs):
        v_key = kwargs.get('v_key')
        print(f"Verifying email for key: {v_key}")
        serializer = self.serializer_class(data={'v_key': v_key})
        serializer.is_valid(raise_exception=True)

        fname = serializer.validated_data.get('fname')
        try:
            user = user_register.objects.get(fname=fname)  # Replace with your actual model
        except user_register.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        user.v_status = 1
        user.save()

        user_data = {"u_data": user}
        return render(request, 'update_design/welcome.html', user_data)



# views.py
class LoginAuthView(viewsets.GenericViewSet):
    serializer_class = LoginAuthSerializer

    def login_auth_panel(self, request):
        if 'user_id' in request.session:
            return redirect('prediction_panel')

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            try:
                user = user_register.objects.get(email=email)
                if user.password == password:
                    request.session['user_id'] = user.id
                    request.session['user_email'] = user.email
                    request.session['user_fname'] = user.fname
                    return redirect('prediction_panel')
                else:
                    messages.success(request, 'Wrong Password')
                    return redirect('/login/')
            except user_register.DoesNotExist:
                messages.success(request, 'This user is not available')
                return redirect('/login/')

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LogoutAuthView(viewsets.GenericViewSet):
    serializer_class = LogoutAuthSerializer

    def logout_auth_panel(self, request):
        if 'user_id' in request.session:
            request.session.flush()
        if 'social_auth_google-oauth2' in request.session:
            del request.session['social_auth_google-oauth2']
        return redirect('aut_index')
    
def csrf_failure_view(request, reason=""):
    return HttpResponse(render(request, 'auth_user/csrf_failure.html'), status=403)


class AuthUserIndexView(viewsets.GenericViewSet):
    serializer_class = AuthUserIndexSerializer

    def auth_user_index(self, request):
        if 'user_id' in request.session:
            return redirect('/hm/')
        return render(request, 'update_design/index.html')

class TermsOfUseView(viewsets.GenericViewSet):
    serializer_class = TermsOfUseSerializer

    def terms_of_use(self, request):
        return render(request, 'update_design/terms.html')
    

class PrivacyPolicyView(viewsets.GenericViewSet):
    serializer_class = PrivacyPolicySerializer

    def privacy_policy(self, request):
        return render(request, 'update_design/privacy.html')













# def otp_verify(request,id):
#     if request.method == 'POST':
#         v_key = request.POST.get('verify')
#         user = user_register.objects.get(v_key=v_key)
#         user.v_status = 1
#         user.save()
#         user_data = {"u_data":user}
#         return render(request,'auth_user/congrats.html',user_data)

# def pin_check(request):
#     all_user_data = user_register.objects.select_related('id').all()
#     user_data ={'user_data':all_user_data}
#     return render(request,'auth_user/pin_check.html',user_data)

# def otp_generator(fname):
#     random_number = random.choices('123456790',k=4)
#     random_number = ''.join(random_number)

#     link = f"<p>Congratulations Mr {fname} ! For registering as a user in our doctor appointment system. To confirm the registration </p><a href='http://127.0.0.1:8000/pin_check/' target='_blank'>Activation Link</a> <br><br><h1>{random_number}</h1>"

#     return random_number, link
