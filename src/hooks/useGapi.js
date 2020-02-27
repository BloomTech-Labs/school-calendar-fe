import { useEffect, useState } from 'react';

// Custom hook to initialize and use the Google API
function useGapi({
  apiKey,
  clientId,
  discoveryDocs,
  scope,
  ux_mode,
  redirect_uri,
  onLoaded
}) {
  const [gapi, setGapi] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Create script tag, initialize gapi, append script to document
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            apiKey,
            discoveryDocs,
            clientId,
            scope,
            ux_mode,
            redirect_uri
          });
          const auth = window.gapi.auth2.getAuthInstance();
          auth.isSignedIn.listen(() => {
            setIsAuthenticated(auth.currentUser.get().hasGrantedScopes(scope));
          });
          // Load an API (ex. Calendar API) when client is loaded to the DOM
          onLoaded(window.gapi.client);
          setIsAuthenticated(auth.currentUser.get().hasGrantedScopes(scope));
          setCurrentUser(auth.currentUser.get().getBasicProfile());
          setGapi(window.gapi);
        } catch (error) {
          console.log(error);
        }
      });
    };

    document.body.appendChild(script);
  }, [apiKey, clientId, discoveryDocs, scope, ux_mode, redirect_uri, onLoaded]);

  useEffect(() => {
    !gapi ? setIsLoading(true) : setIsLoading(false);
  }, [isLoading, gapi]);

  const onSignOut = async () => {
    if (!gapi) {
      throw new Error('No Gapi');
    }
    await gapi.auth2.getAuthInstance().signOut();
  };

  const onSignIn = async () => {
    if (!gapi) {
      throw new Error('No Gapi');
    }
    await gapi.auth2.getAuthInstance().signIn();
  };

  return {
    isLoading,
    currentUser,
    isAuthenticated,
    onSignIn,
    onSignOut
  };
}

export default useGapi;
