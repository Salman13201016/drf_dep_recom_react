# serializers.py
from rest_framework import serializers
from .models import user_register
from django.core.mail import send_mail
# from django.core.mail import DEFAULT_FROM_EMAIL
from django.contrib import messages
from django.conf import settings
import re
from django.core.signing import Signer
import datetime
import random
from django.utils.html import format_html
from rest_framework import serializers
from datetime import datetime
from django.core.signing import BadSignature
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password


class UserIndexPanelSerializer(serializers.Serializer):
    all_data = serializers.ListField()
    status = serializers.BooleanField()
    msg = serializers.ListField()


class SignUpSerializer(serializers.ModelSerializer):
    conf_password = serializers.CharField(write_only=True)

    class Meta:
        model = user_register
        fields = ['id', 'fname', 'email', 'mobile', 'password', 'date_of_birth', 'conf_password']

    def validate(self, data):
        # Your validation logic here
        id = data.get('id')
        fname = data.get('fname')
        email = data.get('email').strip()
        mobile = data.get('mobile')
        password = data.get('password')
        date_of_birth = data.get('date_of_birth')
        conpw = data.get('conf_password')
        e_pattern = r"^[a-zA-Z0-9_.]+@gmail\.com$"
        o_pattern = r"^[a-zA-Z0-9_.]+@(outlook\.com|hotmail\.com|live\.com)$"
        y_pattern = r"^[a-zA-Z0-9_.]+@yahoo\.com$"

        if any(len(value) == 0 for value in [fname, email, mobile, password, conpw]):
            raise serializers.ValidationError('Empty field not accepted')

        if len(fname) < 3:
            raise serializers.ValidationError('The field length must be a minimum of 3')

        if len(password) < 8:
            raise serializers.ValidationError('Password length must be a minimum of 8')
        
        if date_of_birth is None:
            raise serializers.ValidationError('Date of birth is required.')

        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError('Password must contain at least one uppercase letter')

        if not re.search(r'\d', password):
            raise serializers.ValidationError('Password must contain at least one digit')

        if not re.search(r'[!@#$%^&*()_+=\-{}[\]:;"\'|<,>.?/~]', password):
            raise serializers.ValidationError('Password must contain at least one special character')

        if password != conpw:
            raise serializers.ValidationError('Your password and confirm password do not match.')

        if user_register.objects.filter(mobile=mobile).exists():
            raise serializers.ValidationError('Phone number already exists.')

        if len(mobile) != 11:
            raise serializers.ValidationError('Phone number must be 11 digits.')

    

        if not re.match(e_pattern, email) and not re.match(o_pattern, email) and not re.match(y_pattern, email):
            raise serializers.ValidationError('Email is not valid.')

        return data

    def create(self, validated_data):
        email_generator_serializer = EmailGeneratorSerializer(data=validated_data)
        if email_generator_serializer.is_valid():
            v_key, link = email_generator_serializer.email_generator(validated_data)

        # Create user_register object
        user = user_register.objects.create(
            
            fname=validated_data['fname'],
            email=validated_data['email'],
            mobile=validated_data['mobile'],
            password=validated_data['password'],
            date_of_birth=validated_data['date_of_birth'],
            v_key=v_key,
            v_status=0
        )

        # Send email
        subject = f"Hello Mr. {validated_data['fname']} Please confirm your Registration in Doc.com"
        send_mail(subject, link, 'nirbanmitra007@gmail.com', [validated_data['email']], html_message=link)

        messages.success(self.context['request'], 'User Registration successfully!')
        return user


class EmailGeneratorSerializer(serializers.Serializer):
    fname = serializers.CharField()

    def email_generator(self, validated_data):
        current_time = datetime.now().strftime("%H:%M:%S")
        h, m, s = map(int, current_time.split(':'))
        time_sec = h * 3600 + m * 60 + s
        time_sec = str(time_sec)

        random_number = random.choices('123456790', k=4)
        random_number = ''.join(random_number)
        v_c = time_sec + random_number

        signer = Signer()
        encrypted_value = signer.sign(v_c)
        encrypted_value1 = signer.sign(v_c).split(":")[1]
        decrypted_value = signer.unsign(encrypted_value)
        
        link = f"<p>Congratulations Mr {validated_data['fname']} ! For registering as a user in our doctor appointment system. To confirm the registration </p><a href='http://127.0.0.1:8000/auth_user/email_verification/{encrypted_value1}/' target='_blank'>please click this Activation link</a>"
        print(encrypted_value)

        formatted_link = format_html(link)
        return encrypted_value1, formatted_link

class UserEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_register
        fields = ['id','email']

class EmailVerificationSerializer(serializers.Serializer):
    fname = serializers.CharField(required=False)

    def validate_fname(self, value):
        if value:
            if not user_register.objects.filter(fname=value).exists():
                raise serializers.ValidationError("User not found.")
        return value


# class EmailVerificationSerializer(serializers.Serializer):
#     fname = serializers.CharField(required=False)

#     def validate_fname(self, value):
#         if value:
#             if not user_register.objects.filter(fname=value).exists():
#                 raise serializers.ValidationError("User not found.")
#         return value


# serializers.py
class LoginAuthSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


# serializers.py
class LogoutAuthSerializer(serializers.Serializer):
    pass

# views.py

class CsrfFailureSerializer(serializers.Serializer):
    pass

class AuthUserIndexSerializer(serializers.Serializer):
    pass

# serializers.py
class TermsOfUseSerializer(serializers.Serializer):
    pass

# serializers.py
class PrivacyPolicySerializer(serializers.Serializer):
    pass







