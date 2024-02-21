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
  location GEOGRAPHY(Point, 4326) NOT NULL,
  amenities TEXT[],
  hours_of_operation JSONB
);



CREATE TABLE GymPhotos (
  id SERIAL PRIMARY KEY,
  gym_id INTEGER REFERENCES Gyms(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL
);


CREATE TABLE PassOptions (
  id SERIAL PRIMARY KEY,
  gym_id INTEGER REFERENCES Gyms(id) ON DELETE CASCADE,
  pass_name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  duration TEXT NOT NULL,
  description TEXT
);

CREATE TABLE GuestPassPurchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
  gym_id INTEGER REFERENCES Gyms(id) ON DELETE CASCADE,
  pass_option_id INTEGER REFERENCES PassOptions(id) ON DELETE CASCADE,
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Payments (
  id SERIAL PRIMARY KEY,
  purchase_id INTEGER REFERENCES GuestPassPurchases(id) ON DELETE CASCADE,
  payment_method VARCHAR(50) NOT NULL,
  amount NUMERIC NOT NULL,
  transaction_id VARCHAR(100),
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
