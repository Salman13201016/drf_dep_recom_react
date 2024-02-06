# urls.py
from django.urls import path
from .views import PredictionPanelAPIView, GetDataAPIView, GetDeptDataAPIView, \
    PredictionStoreAPIView, PredictionHistoryStoreAPIView

urlpatterns = [
    path('prediction/prediction/', PredictionPanelAPIView.as_view(), name='prediction_api'),
    path('prediction/get_data/', GetDataAPIView.as_view(), name='get_data_api'),
    path('prediction/get_dept_data/', GetDeptDataAPIView.as_view(), name='get_dept_data_api'),
    path('prediction/prediction_store/', PredictionStoreAPIView.as_view(), name='prediction_store_api'),
    path('prediction/prediction_history_store/', PredictionHistoryStoreAPIView.as_view(), name='prediction_history_store_api'),
    # Add other paths as needed
]
