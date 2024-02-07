# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import SymptomSerializer, DepartmentHistoryPredictionSerializer
import numpy as np
import json
import nltk
from nltk.corpus import stopwords
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
import tensorflow as tf
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from .models import Symptom, Department_history_prediction
from .serializers import SymptomSerializer

class PredictionPanelAPIView(APIView):
    def get(self, request, *args, **kwargs):
        google_data = request.session.get('social_auth_google-oauth2')

        if google_data:
            data_symptom = Symptom.objects.values_list(
                'symptom1', 'symptom2', 'symptom3', 'symptom4', 'symptom5', 'symptom6', 'symptom7',
                'symptom8', 'symptom9', 'symptom10', 'symptom11', 'symptom12', 'symptom13', 'symptom14',
                'symptom15', 'symptom16', 'symptom17').distinct()

            serializer = SymptomSerializer({
                'symptom_data1': data_symptom[0],
                # Add fields for other symptoms
            })

            return Response(serializer.data, status=status.HTTP_200_OK)

        elif 'user_id' in request.session:
            data_symptom = Symptom.objects.values_list(
                'symptom1', 'symptom2', 'symptom3', 'symptom4', 'symptom5', 'symptom6', 'symptom7',
                'symptom8', 'symptom9', 'symptom10', 'symptom11', 'symptom12', 'symptom13', 'symptom14',
                'symptom15', 'symptom16', 'symptom17').distinct()

            serializer = SymptomSerializer({
                'symptom_data1': data_symptom[0],
                # Add fields for other symptoms
            })

            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            return Response({'detail': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)


class GetDataAPIView(APIView):
    def get(self, request, *args, **kwargs):
        selected_option = request.GET.get('selected_option')

        results = Symptom.objects.filter(
            Q(symptom1=selected_option) |
            Q(symptom2=selected_option) |
            Q(symptom3=selected_option) |
            Q(symptom4=selected_option) |
            Q(symptom5=selected_option) |
            Q(symptom6=selected_option) |
            Q(symptom7=selected_option) |
            Q(symptom8=selected_option) |
            Q(symptom9=selected_option) |
            Q(symptom10=selected_option) |
            Q(symptom11=selected_option) |
            Q(symptom12=selected_option) |
            Q(symptom13=selected_option) |
            Q(symptom14=selected_option) |
            Q(symptom15=selected_option) |
            Q(symptom16=selected_option) |
            Q(symptom17=selected_option)
        ).values()

        return Response({'data': list(results)})


class GetDeptDataAPIView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            data_array = request.GET.getlist('selectedValues[]', [])
            data_array = {'selectedValues': data_array}
            space_separated_string = ','.join(data_array['selectedValues'][:-1])

            user_input = space_separated_string

            user_input_tfidf = tfidf_vectorizer.transform([user_input])
            user_input_tfidf_reshaped = np.zeros((user_input_tfidf.shape[0], 346))
            user_input_tfidf_reshaped[:, :user_input_tfidf.shape[1]] = user_input_tfidf.toarray()

            prediction = model.predict(user_input_tfidf_reshaped)
            predicted_class = label_encoder.inverse_transform([np.argmax(prediction)])[0]

            return Response({'status': predicted_class})
        except Exception as e:
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class PredictionStoreAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            prediction1 = request.data.get('prediction1')
            prediction2 = request.data.get('prediction2')
            prediction3 = request.data.get('prediction3')
            prediction4 = request.data.get('prediction4')
            prediction5 = request.data.get('prediction5')
            # Add other predictions

            symptom_model = Symptom()
            symptom_model.symptom1 = prediction1
            symptom_model.symptom2 = prediction2
            symptom_model.symptom3 = prediction3
            symptom_model.symptom4 = prediction4
            symptom_model.symptom5 = prediction5
            # Add other symptoms

            symptom_model.save()

            return Response({'message': 'The Prediction name has been inserted successfully'}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'message': 'Duplicate prediction name'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PredictionHistoryStoreAPIView(APIView):
    def get(self, request, *args, **kwargs):
        selected_dept = request.GET.get('dept')
        predicted_dept = request.GET.get('depart_status')
        final_result = request.GET.get('final_result')

        history = Department_history_prediction()
        history.selected_dept = selected_dept
        history.dept_status = predicted_dept
        history.final_result = final_result

        history.save()

        return Response({'message': 'success'}, status=status.HTTP_201_CREATED)
