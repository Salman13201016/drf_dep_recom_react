# from django.contrib.auth.backends import ModelBackend
# from auth_user.models import user_register


# class CustomAuthBackend(ModelBackend):
#     def authenticate(self, request, email=None, password=None):
#         user = user_register.objects.get(email=email)
#         if user.verify_password(request, password) and user.v_status == 1:
#             return request, user
#         else:
#             return None
#     def get_user(self, user_id):
#         return user_register.objects.get(pk=user_id)
