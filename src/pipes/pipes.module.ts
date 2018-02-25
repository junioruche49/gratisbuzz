import { NgModule } from '@angular/core';
import { FilterSearchPipe } from './filtersearch/filtersearch';
import { SanitizeHtmlPipe } from './sanitize-html/sanitize-html';
@NgModule({
	declarations: [FilterSearchPipe,
    SanitizeHtmlPipe],
	imports: [],
	exports: [FilterSearchPipe,
    SanitizeHtmlPipe]
})
export class PipesModule {}
