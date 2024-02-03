
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE Gyms (
  id SERIAL PRIMARY KEY,
  gym_name TEXT NOT NULL,
  description TEXT,
  address1 TEXT NOT NULL,
  address2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zipcode TEXT NOT NULL,
  longitude NUMERIC NOT NULL,
  latitude NUMERIC NOT NULL,
  location POINT NOT NULL,
  amenities TEXT[],
  hours_of_operation JSONB
);



CREATE TABLE GymPhotos (
  id SERIAL PRIMARY KEY,
  gym_id INTEGER REFERENCES Gyms(id) ON DELETE CASCADE,
  picture TEXT NOT NULL
);

CREATE TABLE GuestPassPurchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
  gym_id INTEGER REFERENCES Gyms(id) ON DELETE CASCADE,
  option_id INTEGER REFERENCES PassOptions(id) ON DELETE CASCADE,
  payment_method TEXT NOT NULL,
  purchase_date DATE NOT NULL,
  expiration_date DATE NOT NULL
);

CREATE TABLE PassOptions (
  id SERIAL PRIMARY KEY,
  gym_id INTEGER REFERENCES Gyms(id) ON DELETE CASCADE,
  pass_name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  duration TEXT NOT NULL,
  description TEXT
);