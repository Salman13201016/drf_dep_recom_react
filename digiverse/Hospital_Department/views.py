from django.shortcuts import render,redirect
from Hospital_Department.models import hospital_department
from dashboard_from.models import Doctor_Depert_name
from hospital.models import hospital_categories
from . import models 
from django.contrib import messages
from django.db import IntegrityError

# Create your views here.

def hospital_depart_panel(request):
    if 'user_id' in request.session:
        hospila_dep_data = hospital_department.objects.all() 
        dept_fk_data = Doctor_Depert_name.objects.all()     
        hosp_fk_data = hospital_categories.objects.all()     
        context = {"hospital_det_data":hospila_dep_data,"dept_fk":dept_fk_data,"hosp_fk":hosp_fk_data}
    else:
        return redirect('aut_login')
    return render(request,'form/Hospital_Department/hospital_department.html',context)

def hospital_depart_store(request): 
    try:
        depart_fk = request.POST.get('dep_sel_fk') 
        hosp_fk = request.POST.get('hos_sel_fk') 
        
        
        hosp_dep_model = models.hospital_department()
        hosp_dep_model.select_depart_id = depart_fk
        hosp_dep_model.select_hosp_id = hosp_fk      
        hosp_dep_model.save()
        
        messages.success(request, 'The Hospital Department name hase been inserted Successfully')
        return redirect('/hos_depart/')
    except (IntegrityError) as e: 
        messages.error(request, 'The Hospital Department name hase been inserted Successfully')   
        return render(request,'form/Hospital_Department/hospital_department.html')
