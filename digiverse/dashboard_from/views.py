from django.shortcuts import render,get_object_or_404,redirect
from django.http import HttpResponse
from . import models 
from . models import Doctor_Depert_name
from . models import Sub_Disease
from django.contrib import messages
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.dispatch import receiver
# from social_django.signals import social_auth_registered



# The social_auth_registered signal handler remains unchanged
# @receiver(social_auth_registered)

# Create your views here.

# @login_required
# @login_required(login_url="/aut_login/")
# @login_required
def name_panel(request):
    google_data = request.session.get('social_auth_google-oauth2')
    print(google_data)
    # request.session['user_gid'] = google_data.uid
    # request.session['user_gemail'] = google_data.email
    if google_data:
        return render(request,'common_code/home.html')
    elif 'user_id' in request.session:
        return render(request,'common_code/home.html')

    else:
        return redirect('aut_login')

def dep_name_panel(request):
    if 'user_id' in request.session:
        data1 = Doctor_Depert_name.objects.values('id','name').distinct()
        storage = messages.get_messages(request)
        storage.used = True
        context = {'depart_data':data1,}
        return render(request,'form/Department/form-basic-inputs.html', context)
    else:
        return redirect('aut_login')
    
    
def department_name_store(request):
    
    try:
        
        name = request.POST.get('depat_name')
        if (len(name) < 4 ):
            messages.error(request, 'minimum 4')
            return redirect('/home/')
        
        if models.Doctor_Depert_name.objects.filter(name=name).exists():
            messages.info(request, 'Department name already exists.')
            return redirect('/home/')
        
        else:
            depar_model = models.Doctor_Depert_name()
            depar_model.name = name
            depar_model.save()
            messages.success(request, 'The Department name hase been inserted Successfully')
            return redirect('/home/')
            # return render(request,'form/form-basic-inputs.html')
    except (IntegrityError) as e: 
        messages.error(request, 'The Department name hase been inserted Successfully')
        
        return render(request,'form/Department/form-basic-inputs.html')
    
def edit_depart_name(request, id):
    # data = get_object_or_404(Doctor_Depert_name, id=id)
    context={
        'id':id,
    }
    return render(request,'form/Department/edit.html',context)

def update(request):
    id = request.POST.get('id')
    data = get_object_or_404(Doctor_Depert_name, id=id)  
    name = request.POST.get('depat_name')
    data.name = name
    data.save()
    return redirect('/home/')

def delete(request, id):
    data = get_object_or_404(Doctor_Depert_name, id=id)
    data.delete()
    return redirect('/home/')

#Department End

#Disease start
 
def disease_panel(request):
    if 'user_id' in request.session:
        data2 = Doctor_Depert_name.objects.all()   
        context = {"disease_data":data2}
    else:
        return redirect('aut_login')
    return render(request,'form/Disease/disease.html',context)

def disease_sub_store(request):   
    try:
        name = request.POST.get('disease_name')
        if (len(name) < 4 ):
            messages.error(request, 'minimum 4')
            return redirect('/di_panel/')
        
        if models.Sub_Disease.objects.filter(name=name).exists():
            messages.info(request, 'Disease name already exists.')
            return redirect('/di_panel/')
        
        else:
            dep_id = request.POST.get('dep_id')
            sub_model = models.Sub_Disease()
            sub_model.name = name
            sub_model.dep_id_id = dep_id
            sub_model.save()
            messages.success(request, 'The Disease name hase been inserted Successfully')
            return redirect('/di_panel/')
            
    except (IntegrityError) as e: 
        messages.error(request, 'The Disease name hase been inserted Successfully')
        
        return redirect('/di_panel/')
    
         
