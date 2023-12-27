import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { AuthenticationQuery } from 'src/app/core/authentication/authentication.query';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { LanguageQuery } from 'src/app/core/localization/language.query';
import { LanguageService } from 'src/app/core/localization/language.service';
import { LoginComponent } from '../login/login.component';
import { ProductApiService } from './../../../shared/api-services/product-api.service';
import { UpdatePasswordService } from './../../../shared/component/update-password-form/update-password.service';
import { PagingModel } from '../../../shared/models/paging.model';
import { Product } from './../../../shared/models/product.model';
import { CartQuery } from './../../modules/cart/state/cart.query';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('loginPage') loginComponent!: LoginComponent;
  userProfile$ = this.authenticationQuery.userProfile$;
  languages = this.translateService.getLangs();
  languageSelected!: string;

  autoCompleteData: Product[] = [];
  searchValue = new FormControl('');
  destroyed$ = new Subject<void>();
  listFlag = [
    {
      lang: 'vi',
      flag: 'assets/flag/vn-flag.svg'
    },
    {
      lang: 'en',
      flag: 'assets/flag/usa-flag.svg'
    },
  ];
  flagLanguageSelected!: string;
  totalCartItemsQuantity$ = this.cartQuery.totalQuantity$;
  constructor(
    private readonly authenticationQuery: AuthenticationQuery,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly languageQuery: LanguageQuery,
    private readonly translateService: TranslateService,
    private readonly languageService: LanguageService,
    private readonly updatePasswordService: UpdatePasswordService,
    private readonly cartQuery: CartQuery,
    private readonly productApiService: ProductApiService
  ) { }

  ngOnInit(): void {
    this.getCurrentLanguage();
    this.setUpAutoCompleteSearch();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete;
  }

  setUpAutoCompleteSearch(): void {
    this.searchValue.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if(!value) {
          return of({} as PagingModel<Product>);
        }
        return this.productApiService.getProducts(value, '', '', 1, 5);
      }),
      takeUntil(this.destroyed$)
    ).subscribe(res => this.autoCompleteData = res.items);
  }

  getCurrentLanguage(): void {
    this.languageQuery.select(x => x.language).subscribe((lang) => {
      if (!lang) {
        lang = this.translateService.getDefaultLang();
      }
      this.languageSelected = lang;
      this.flagLanguageSelected = this.listFlag.find(x => x.lang === lang)!.flag;
    });
  }

  onChangeLanguage(lang: string): void {
    this.languageService.updateLanguage(lang);
  }

  login(): void {
    this.loginComponent.isModalVisible = true;
  }

  logout(): void {
    this.authenticationService.logout();
  }

  goAdminPage(): void {
    this.router.navigate(['admin']);
  }

  updatePassword(): void {
    this.updatePasswordService.openUpdatePasswordForm();
  }

  goToDetail(slug: string): void {
    this.router.navigate([`product/${slug}`]);
  }
}
