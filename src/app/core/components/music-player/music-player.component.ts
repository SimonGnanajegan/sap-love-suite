import { Component, ElementRef, ViewChild, AfterViewInit, signal, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss'
})
export class MusicPlayerComponent implements AfterViewInit, OnDestroy {
  isPlaying = signal(false);
  isMuted = signal(false);
  
  private player: any;
  private videoId = 'syFZfO_wfMQ'; // One Direction - Night Changes

  ngAfterViewInit() {
    this.loadYouTubeAPI();
  }

  loadYouTubeAPI() {
    // If API is already loaded, init player
    if (window.YT && window.YT.Player) {
      this.initPlayer();
      return;
    }

    // Only load script if not already present
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Always overwrite the callback to ensure this component gets notified
    window.onYouTubeIframeAPIReady = () => this.initPlayer();
  }

  initPlayer() {
    try {
      this.player = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: this.videoId,
        playerVars: {
          'autoplay': 1,
          'controls': 0,
          'loop': 1,
          'playlist': this.videoId, // Required for loop
          'modestbranding': 1,
          'rel': 0
        },
        events: {
          'onReady': (event: any) => this.onPlayerReady(event),
          'onStateChange': (event: any) => this.onPlayerStateChange(event)
        }
      });
    } catch (e) {
      console.error('Error initializing YouTube player', e);
    }
  }

  onPlayerReady(event: any) {
    event.target.setVolume(50);
    event.target.playVideo();
  }

  onPlayerStateChange(event: any) {
    // YT.PlayerState.PLAYING is 1, PAUSED is 2, BUFFERING is 3
    if (event.data === window.YT.PlayerState.PLAYING) {
      this.isPlaying.set(true);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      this.isPlaying.set(false);
    } else if (event.data === window.YT.PlayerState.ENDED) {
       this.player.playVideo(); // Force loop if native loop fails
    }
  }

  togglePlay() {
    if (this.player && typeof this.player.getPlayerState === 'function') {
      const state = this.player.getPlayerState();
      if (state === window.YT.PlayerState.PLAYING) {
        this.player.pauseVideo();
      } else {
        this.player.playVideo();
      }
    } else {
      console.warn('Player not ready');
      // Retry init if player is missing
      if (!this.player) this.initPlayer();
    }
  }

  // Global listener to ensure music starts on first interaction if blocked
  @HostListener('document:click')
  @HostListener('document:touchstart')
  ensurePlayback() {
    if (this.player && typeof this.player.getPlayerState === 'function') {
      const state = this.player.getPlayerState();
      // If unstarted (-1), cued (5), or paused (2) and we want it to autoplay
      if (state === -1 || state === 5 || state === 2) {
        if (!this.isPlaying()) {
          this.player.playVideo();
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.player && this.player.destroy) {
      this.player.destroy();
    }
  }
}
