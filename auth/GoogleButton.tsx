import { Component } from 'react';
import Head from 'next/head';
import { signIn } from './signIn';
import { isDev } from '../utils/isDev';

interface GoogleResponse {
  credential: string;
}

declare global {
  interface Window {
    handleGoogleResponse: (e: GoogleResponse) => void;
  }
}

export class GoogleButton extends Component {
  componentDidMount() {
    window.handleGoogleResponse = this.handleGoogleResponse;
  }

  async handleGoogleResponse(e: GoogleResponse) {
    if (isDev) console.log(e.credential);
    signIn('google', e.credential);
  }

  render() {
    return (
      <>
        <Head>
          <script src="https://accounts.google.com/gsi/client" async />
        </Head>
        <div
          id="g_id_onload"
          // data-auto_prompt="false"
          data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          data-callback="handleGoogleResponse"
        />
        <div
          data-width="300"
          data-shape="pill"
          data-size="large"
          data-text="signin"
          data-type="standard"
          className="g_id_signin h-10 bg-white rounded-full"
          // data-theme="filled_blue"
          data-logo_alignment="left"
        />
      </>
    );
  }
}
