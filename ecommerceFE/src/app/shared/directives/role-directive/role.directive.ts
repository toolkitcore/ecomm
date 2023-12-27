import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationQuery } from 'src/app/core/authentication/authentication.query';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit, OnDestroy {
  requireRoles!: string[] | undefined;
  userRole!: string;
  @Input()
  set appRole(roles: string[] | undefined) {
    this.requireRoles = roles;
    this.updateView();
  }

  destroyed$ = new Subject<void>();
  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly authenticationQuery: AuthenticationQuery
  ) { }

  ngOnInit(): void {
    this.authenticationQuery.select(x => x.userProfile).pipe(takeUntil(this.destroyed$)).subscribe(
      (user) => {
        this.userRole = user.role;
        this.updateView();
      }
    );
  }

  private updateView(): void {
    if (this.checkRole()) {
      if (!this.viewContainer.length) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }

  private checkRole(): boolean {
    if (!this.requireRoles || this.requireRoles.length === 0) {
      return true;
    }
    return this.requireRoles.includes(this.userRole);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
