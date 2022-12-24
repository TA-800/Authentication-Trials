from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    # path('login/', views.login, name='login'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('courses/', views.courses, name='courses'),
    path('life/', views.life, name='life')
]
