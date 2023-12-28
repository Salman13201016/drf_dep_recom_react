# registration/forms.py
from django import forms
from .models import Registration

class RegistrationForm(forms.ModelForm):
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Registration
        fields = ['name', 'email', 'mobile_no', 'password', 'confirm_password', 'nid_or_birth_certificate']

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password != confirm_password:
            raise forms.ValidationError("Passwords do not match")

class EmailVerificationForm(forms.Form):
    verification_code = forms.CharField(max_length=10)
