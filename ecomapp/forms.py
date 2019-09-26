from django import forms
from django.contrib.auth.models import User
from django.utils import timezone


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.fields['username'].label = 'User Name'
        self.fields['password'].label = 'Password'

    def clean(self):
        username = self.cleaned_data['username']
        password = self.cleaned_data['password']
        # проверяем имя юзера и пароль
        if not User.objects.filter(username=username).exists():
            raise forms.ValidationError({'username': 'Wrong User Name'}, code='wrong user')
        user = User.objects.get(username=username)
        if user and not user.check_password(password):
            raise forms.ValidationError({'password': 'Wrong Password'}, code='wrong password')



class RegistrationForm(forms.ModelForm):
    password_check = forms.CharField(widget=forms.PasswordInput, initial='123')
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'password_check',
            'first_name',
            'last_name',
            'email'
        ]

    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)
        self.fields['username'].label = 'User Name'
        self.fields['password'].label = 'Password'
        self.fields['password_check'].label = 'Confirm Password'
        self.fields['first_name'].label = 'First Name'
        self.fields['last_name'].label = 'Last Name'
        self.fields['email'].label = 'Email'

        # метод для проверки имени пользователя, имейла и тд на уже находящийся в базе

    def clean(self):
        username = self.cleaned_data['username']
        password = self.cleaned_data['password']
        password_check = self.cleaned_data['password_check']
        email = self.cleaned_data['email']
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError({'username': 'Username is exist'}, code='user exists')
        if password != password_check:
            raise forms.ValidationError({
                'password': '',
                'password_check': 'Passwords do not match'},
                code='passwords do not match', )
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError({'email': 'This Email is exist'},
                                        code='email exists')


class OrderForm(forms.Form):
    first_name = forms.CharField()
    last_name = forms.CharField(required=True)
    phone = forms.CharField(help_text='A valid Phone number, please')
    email = forms.EmailField(help_text='A valid email address, please')
    buying_type = forms.ChoiceField(widget=forms.Select(), choices=(('Pickup', 'Pickup'), ('Delivery', 'Delivery')),
                                    label='Type of Delivery')
    address = forms.CharField(required=False, label='Delivery address')
    date = forms.DateTimeField(widget=forms.SelectDateWidget(), initial=timezone.now(),
                               help_text='If you chose a Pickup, the manager will contact you to clarify the exact delivery date',
                               label='Date of Delivery')
    comments = forms.CharField(widget=forms.Textarea, required=False, label='Comments to the order')

    def __init__(self, *args, **kwargs):
        super(OrderForm, self).__init__(*args, **kwargs)
