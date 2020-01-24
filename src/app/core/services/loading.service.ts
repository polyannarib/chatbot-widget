import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  public static fullLoadingCount = 0;
  public static smallLoadingCount = 0;

  getPreloaderCount(preloaderType = 'full'): number {
    if (preloaderType === 'full') {
      return LoadingService.fullLoadingCount;
    } else if (preloaderType === 'small') {
      return LoadingService.smallLoadingCount;
    }
  }

  showPreloader(preloaderType = 'full'): void {
    if (preloaderType === 'full') {
      LoadingService.fullLoadingCount++;
    } else if (preloaderType === 'small') {
      LoadingService.smallLoadingCount++;
    }
  }

  hidePreloader(preloaderType = 'full'): void {
    if (preloaderType === 'full') {
      LoadingService.fullLoadingCount = Math.max(0, LoadingService.fullLoadingCount - 1);
    } else if (preloaderType === 'small') {
      LoadingService.smallLoadingCount = Math.max(0, LoadingService.smallLoadingCount - 1);
    }
  }
}
