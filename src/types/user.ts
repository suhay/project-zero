export type Preferences = {
    theme: string;
    language: string;
  };
  
export type User<PreferenceType> = {
    email: string;
    // name: string;
    password: string;
    preferences?: PreferenceType;
  };
  