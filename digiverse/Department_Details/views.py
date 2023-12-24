from django.shortcuts import render,redirect
from Department_Details.models import department_details
from dashboard_from.models import Doctor_Depert_name
from . import models 
from django.contrib import messages
from django.db import IntegrityError

# Create your views here.

def dep_det_panel(request):
    dep_det_data = department_details.objects.all() 
    dept_data = Doctor_Depert_name.objects.all()     
    context = {"dep_det_data":dep_det_data,"dept_data":dept_data}
    return render(request,'form/Department_Details/department_details.html',context)

def depart_det_store(request): 
    try:
        dep_det_fk = request.POST.get('dep_det_fk') 
        text = request.POST.get('descrip') 
        put = request.POST.get('put') 
        
        depart_det_model = models.department_details()
        depart_det_model.select_dep_id = dep_det_fk
        depart_det_model.text = text
        depart_det_model.put = put
              
        depart_det_model.save()
        messages.success(request, 'The Department Details name hase been inserted Successfully')
        return redirect('/depart_details/')
    except (IntegrityError) as e: 
        messages.error(request, 'The Department Details name hase been inserted Successfully')   
        return render(request,'form/Department_Details/department_details.html')
