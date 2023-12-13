# registration/views.py
from rest_framework import viewsets
from django.shortcuts import render, redirect
from rest_framework.response import Response
from .models import Registration
from .forms import RegistrationForm, EmailVerificationForm
from .serializers import RegistrationSerializer, EmailVerificationSerializer
import random
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import action

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    @action(detail=True, methods=['post'])
    def verify_email(self, request, pk=None):
        user = self.get_object()
        serializer = EmailVerificationSerializer(data=request.data)

        if serializer.is_valid():
            verification_code = serializer.validated_data['verification_code']

            if verification_code == user.verification_code:
                user.email_verified = True
                user.save()
                return Response({'detail': 'Email verification successful. You are now registered.'})
            else:
                return Response({'error': 'Invalid verification code. Please try again.'}, status=400)
        else:
            return Response({'error': 'Invalid data.'}, status=400)

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()

            # Generate a verification code
            verification_code = ''.join(random.choices('0123456789', k=6))
            user.verification_code = verification_code
            user.save()

            # Send email with verification code
            send_mail(
                'Email Verification Code',
                f'Your verification code is: {verification_code}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )

            messages.success(request, 'Registration successful. Check your email for the verification code.')
            return redirect('email_verification', user.id)
    else:
        form = RegistrationForm()

    return render(request, 'registration/register.html', {'form': form})

def email_verification(request, user_id):
    user = Registration.objects.get(pk=user_id)

    if request.method == 'POST':
        form = EmailVerificationForm(request.POST)
        if form.is_valid():
            verification_code = form.cleaned_data['verification_code']

            if verification_code == user.verification_code:
                user.email_verified = True
                user.save()
                messages.success(request, 'Email verification successful. You are now registered.')
                return redirect('login')  # Redirect to your login page or any other page
            else:
                messages.error(request, 'Invalid verification code. Please try again.')

    else:
        form = EmailVerificationForm()

    return render(request, 'registration/email_verification.html', {'form': form})
