import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import keycloakConfig from './keycloak';



class HttpService {
  private static instance: HttpService;
  private http = axios.create();
  private token: string | null | undefined = null; // add token property

  private constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:7000',
    });
    this.token = localStorage.getItem('token') || null; // retrieve token from local storage
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  public async refreshKeycloakToken() {
    keycloakConfig.init({}).then((authenticated) => {
      if (keycloakConfig.authenticated) {
        keycloakConfig
          .updateToken(5)
          .then((refreshed) => {
            if (refreshed) {
              // Access token refreshed successfully
              console.log('Access token refreshed');
              //bearer = keycloak.token;
            } else {
              // Access token has expired, trigger refresh token
              console.log('Access token expired, triggering refresh token');
              keycloakConfig
                .updateToken(0)
                .then((refreshed) => {
                  if (refreshed) {
                    // Refresh token refreshed successfully
                    console.log('Refresh token refreshed');
                  } else {
                    // Refresh token has expired, perform necessary actions
                    console.log('Refresh token expired');
                    keycloakConfig?.logout();
                  }
                })
                .catch((error) => {
                  console.error('Error refreshing refresh token:', error);
                });
            }
          })
          .catch((error) => {
            console.error('Error refreshing access token:', error);
          });
      } else {
        console.log('Not authenticated');
      }
    });
  }

  public async get(url: string): Promise<any> {
    try {
      const token = this.token || keycloakConfig.token; // use token from storage if available

      const headers: AxiosRequestConfig['headers'] = {
        Accept: 'application/json',
        Authorization: `Bearer ${keycloakConfig.token}`,
      };

      // Wait for Keycloak to be initialized before making the request
      const response: AxiosResponse = await this.http.get(url, { headers });

      if (this.token !== token) {
        // update token in storage if it has changed
        this.token = token;
        if (token !== undefined) {
          localStorage.setItem('token', token);
        }
      }

      return response.data;
    } catch (error) {
      console.log('HTTP Error:', error);
      throw error;
    }
  }

  public async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    try {
      const headers: AxiosRequestConfig['headers'] = {
        Accept: 'application/json',
        Authorization: `Bearer ${keycloakConfig.token}`,
      };

      // Wait for Keycloak to be initialized before making the request
      const response: AxiosResponse = await this.http.post(url, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    try {
      // Wait for Keycloak to be initialized before making the request
      const headers: AxiosRequestConfig['headers'] = {
        Accept: 'application/json',
        Authorization: `Bearer ${keycloakConfig.token}`,
      };
      const response: AxiosResponse = await this.http.put(url, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    try {
      // Wait for Keycloak to be initialized before making the request
      const headers: AxiosRequestConfig['headers'] = {
        Accept: 'application/json',
        Authorization: `Bearer ${keycloakConfig.token}`,
      };
      const response: AxiosResponse = await this.http.delete(url, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default HttpService.getInstance();
