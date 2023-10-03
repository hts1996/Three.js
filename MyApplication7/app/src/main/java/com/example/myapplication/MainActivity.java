package com.example.myapplication;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;


public class MainActivity extends AppCompatActivity {

    private WebView webView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_FULL_USER);
        webView.getSettings().setForceDark(WebSettings.FORCE_DARK_OFF);

//WebView 화면크기에 맞추도록 설정 - setUseWideViewPort 와 같이 써야함
        webView.getSettings().setLoadWithOverviewMode(true);
        webView.setBackgroundColor(Color.RED);
//wide viewport 설정 - setLoadWithOverviewMode 와 같이 써야함
        webView.getSettings().setUseWideViewPort(true);
//자바스크립트 사용 여부
        webView.getSettings().setJavaScriptEnabled(true);

//자바스크립트가 window.open()을 사용할 수 있도록 설정
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);



//멀티윈도우 사용 여부
        webView.getSettings().setSupportMultipleWindows(true);
        webView.getSettings().setLoadWithOverviewMode(true);  // WebView 화면크기에 맞추도록 설정 - setUseWideViewPort 와 같이 써야함
        webView.getSettings().setUseWideViewPort(true);  // wide viewport 설정 - setLoadWithOverviewMode 와 같이 써야함
//로컬 스토리지 (localStorage) 사용여부
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true); //윈도우오픈허용


//폼에 입력된 데이터 저장 여부
        webView.getSettings().setSaveFormData(true);

//파일 액세스 허용 여부
        webView.getSettings().setAllowFileAccess(true);
//인코딩 설정
        webView.getSettings().setDefaultTextEncodingName("UTF-8");

//네트워크를 통해 이미지리소스 받을지 여부
        webView.getSettings().setBlockNetworkImage(false);

//database storage API 사용 여부
        webView.getSettings().setDatabaseEnabled(false);

//웹뷰를 통해 Content URL 에 접근 사용 여부
        webView.getSettings().setAllowContentAccess(true);
        webView.setWebViewClient(new WebViewClient());
//        webView.loadUrl("https://www.naver.com");
        webView.loadUrl("https://j9E106.p.ssafy.io");
//        ActionBar actionBar = getSupportActionBar();
//        actionBar.hide();
    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {//뒤로가기 버튼 이벤트
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {//웹뷰에서 뒤로가기 버튼을 누르면 뒤로가짐
            webView.goBack(); //뒤로보내기
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
    private class WebViewClientClass extends WebViewClient {//페이지 이동
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            Log.d("check URL",url);
            view.loadUrl(url);
            return true;
        }
    }



}