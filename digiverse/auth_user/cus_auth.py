

# from django.contrib.auth.backends import ModelBackend
# from auth_user.models import user_register

# class CustomAuthBackend(ModelBackend):
#     def authenticate(self, request, email=None, password=None, **kwargs):
#                 #orm
#         user = user_register.objects.get(request, email=email, v_status=1, password=password)
#         return user