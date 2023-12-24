# from django.http import HttpResponse
# from django.shortcuts import render,redirect
# # from user.models import user_registration
# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate,login
# from django.contrib import messages
# from django.db import IntegrityError
# # Create your views here.

# def index_panel(request):
#     return render(request,'user/index.html')

# def login_panel(request):
#     try:
#         if request.method == 'POST':
#             username = request.POST.get('name')
#             pass1 = request.POST.get('pass')
#             user_login = authenticate(request, username=username ,password=pass1 )
#             if user_login is not None :
#                 login(request, user_login)
#                 return redirect('home')
#             else:               
#                 return HttpResponse('User not vaild account')
#         return render(request,'user/login.html')
#     except (IntegrityError) as e: 
#         messages.error(request, 'The Login name hase been inserted Successfully')   
#         return render(request,'user/Login.html')



# def signup_panel(request):
#     try:
#         if request.method == 'POST':
#             user = request.POST.get('name')
#             email = request.POST.get('email')
#             # mobile = request.POST.get('mobile')
#             pass1 = request.POST.get('pass')
#             con_pass = request.POST.get('con_pass')
#             if pass1 != con_pass:
#                 return HttpResponse('Passwords do not match')
#                 # messages.error(request, "Passwords do not match")
#             else:
#                 user_data = User.objects.create_user(user,email,  pass1)
#                 user_data.save()
#                 messages.success(request, 'The Signup name hase been inserted Successfully')
#         return render(request,'user/signup.html')
#     except (IntegrityError) as e: 
#         messages.error(request, 'The Signup name hase been inserted Successfully')   
#         return render(request,'user/signup.html')
