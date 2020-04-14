import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { AuthService } from 'src/app/services/auth.service';
import { AuthServiceMock } from 'src/app/services/mocks/auth.services.mock';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent
            ],
            imports: [
                TranslateModule.forRoot({
                    loader: {
                      provide: TranslateLoader,
                      useFactory: HttpLoaderFactory,
                      deps: [HttpClient]
                    }
                }),
                ToastrModule.forRoot(),
                HttpClientTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: AuthService, useClass: AuthServiceMock },
                ToastrService,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should render navbar', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.navbar')).toBeTruthy();
    });

    it('should update lang', () => {
        component.changeLanguage('fr');
        expect(component.lang).toBe('fr');
    });
});

