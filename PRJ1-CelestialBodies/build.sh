psql --username=freecodecamp --dbname=postgres

create database universe;

\c universe;

create table galaxy (galaxy_id serial primary key);
create table star (star_id serial primary key);
create table planet (planet_id serial primary key);
create table moon (moon_id serial primary key);
create table mission (mission_id serial primary key);

alter table galaxy add column name varchar (30) not null unique;
alter table star add column name varchar (30) not null unique;
alter table planet add column name varchar (30) not null unique;
alter table moon add column name varchar (30) not null unique;

alter table galaxy add column age_in_millions_of_years int;
alter table star add column age_in_millions_of_years int;
alter table planet add column age_in_millions_of_years int;
alter table moon add column age_in_millions_of_years int;

alter table galaxy add column distance_from_earth int not null;
alter table star add column distance_from_earth int not null;
alter table planet add column distance_from_earth int not null;
alter table moon add column distance_from_earth int not null;

alter table galaxy add column speed_in_kmps numeric(10,2);
alter table star add column speed_in_kmps numeric(10,2);
alter table planet add column speed_in_kmps numeric(10,2);
alter table moon add column speed_in_kmps numeric(10,2);

alter table galaxy add column description text;
alter table star add column description text;
alter table planet add column description text;
alter table moon add column description text;

alter table galaxy add column has_life boolean not null;
alter table star add column has_life boolean not null;
alter table planet add column has_life boolean not null;
alter table moon add column has_life boolean not null;

alter table galaxy add column is_spherical boolean;
alter table star add column is_spherical boolean;
alter table planet add column is_spherical boolean;
alter table moon add column is_spherical boolean;

alter table mission add column name varchar(30) not null unique;
alter table mission add column launch_date date;
alter table mission add column duration_in_days int not null;
alter table mission add column crew_size int;
alter table mission add column description text;
alter table mission add column budget_in_millions_of_dollars numeric;
alter table mission add column successful boolean;
alter table mission add column is_manned boolean;

alter table star add column galaxy_id int references galaxy(galaxy_id);
alter table planet add column star_id int references star(star_id);
alter table moon add column planet_id int references planet(planet_id);
alter table mission add column moon_id int references moon(moon_id);

INSERT INTO galaxy (name, age_in_millions_of_years, distance_from_earth, speed_in_kmps, description, has_life, is_spherical)
VALUES 
('Milky Way', 13600, 0, 552, 'Our home galaxy, containing the Solar System.', TRUE, TRUE), 
('Andromeda', 10000, 2537000, 301, 'Nearest spiral galaxy to the Milky Way.', FALSE, TRUE), 
('Triangulum', 10000, 3000000, 179, 'A member of the Local Group of galaxies.', FALSE, TRUE), 
('Whirlpool', 500, 23000000, 150, 'A classic spiral galaxy with well-defined arms.', FALSE, TRUE), 
('Sombrero', 9000, 29000000, 102, 'Known for its bright nucleus and large central bulge.', FALSE, TRUE), ('Cartwheel', 500, 500000000, 217, 'A ring galaxy with a distinctive cartwheel structure.', FALSE, TRUE);

INSERT INTO star (name, age_in_millions_of_years, distance_from_earth, speed_in_kmps, description, has_life, is_spherical, galaxy_id) 
VALUES 
('Sun', 4600, 0, 220, 'The star at the center of the Solar System.', TRUE, TRUE, 1), 
('Proxima Centauri', 4500, 42400, 320, 'The closest known star to the Sun.', FALSE, TRUE, 2), 
('Sirius', 300, 86100, 250, 'The brightest star in the Earth"s night sky.', FALSE, TRUE, 3), 
('Betelgeuse', 10000, 642500, 20, 'A red supergiant star in the constellation of Orion.', FALSE, TRUE, 4), 
('Rigel', 8000, 863, 240, 'A blue supergiant star in the constellation of Orion.', FALSE, TRUE, 5), 
('Vega', 455, 25000, 180, 'A bright star in the constellation Lyra.', FALSE, TRUE, 6);

INSERT INTO planet (name, age_in_millions_of_years, distance_from_earth, speed_in_kmps, description, has_life, is_spherical, star_id)
VALUES
('Mercury', 4500, 91700000, 47.87, 'The smallest planet in the Solar System.', FALSE, TRUE, 1),
('Venus', 4500, 41400000, 35.02, 'The hottest planet in the Solar System.', FALSE, TRUE, 1),
('Earth', 4500, 0, 29.78, 'The only planet known to support life.', TRUE, TRUE, 1),
('Mars', 4500, 78340000, 24.077, 'Known as the Red Planet.', FALSE, TRUE, 1),
('Proxima b', 4500, 42400, 5.0, 'An exoplanet orbiting Proxima Centauri.', FALSE, TRUE, 2),
('Proxima c', 4500, 42400, 4.0, 'A second exoplanet orbiting Proxima Centauri.', FALSE, TRUE, 2),
('Sirius b', 300, 86100, 5.5, 'A white dwarf orbiting Sirius A.', FALSE, TRUE, 3),
('Sirius c', 300, 86100, 6.0, 'A hypothetical planet orbiting Sirius A.', FALSE, TRUE, 3),
('Betelgeuse b', 10000, 642500, 20.0, 'A planet orbiting the red supergiant Betelgeuse.', FALSE, TRUE, 4),
('Betelgeuse c', 10000, 642500, 25.0, 'Another planet orbiting Betelgeuse.', FALSE, TRUE, 4),
('Rigel b', 8000, 863, 10.0, 'A gas giant orbiting Rigel.', FALSE, TRUE, 5),
('Rigel c', 8000, 863, 11.0, 'Another gas giant orbiting Rigel.', FALSE, TRUE, 5);

INSERT INTO moon (name, age_in_millions_of_years, distance_from_earth, speed_in_kmps, description, has_life, is_spherical, planet_id)
VALUES
('Moon', 4500, 384400, 1.022, 'Earth"s only natural satellite.', FALSE, TRUE, 3),
('Phobos', 4500, 9377, 2.138, 'The larger and closer of Mars"s two moons.', FALSE, TRUE, 4),
('Deimos', 4500, 23460, 1.351, 'The smaller and more distant of Mars"s two moons.', FALSE, TRUE, 4),
('Proxima b Moon', 4500, 42400, 1.0, 'A moon orbiting Proxima b.', FALSE, TRUE, 5),
('Proxima c Moon', 4500, 42400, 1.0, 'A moon orbiting Proxima c.', FALSE, TRUE, 6),
('Sirius b Moon', 300, 86100, 1.0, 'A moon orbiting Sirius b.', FALSE, TRUE, 7),
('Sirius c Moon', 300, 86100, 1.0, 'A moon orbiting Sirius c.', FALSE, TRUE, 8),
('Betelgeuse b Moon', 10000, 642500, 1.0, 'A moon orbiting Betelgeuse b.', FALSE, TRUE, 9),
('Betelgeuse c Moon', 10000, 642500, 1.0, 'A moon orbiting Betelgeuse c.', FALSE, TRUE, 10),
('Rigel b Moon', 8000, 863, 1.0, 'A moon orbiting Rigel b.', FALSE, TRUE, 11),
('Rigel c Moon', 8000, 863, 1.0, 'A moon orbiting Rigel c.', FALSE, TRUE, 12),
('Moon 2', 4500, 384400, 1.022, 'Earth"s second natural satellite.', FALSE, TRUE, 3),
('Phobos 2', 4500, 9377, 2.138, 'The larger and closer of Mars"s two moons.', FALSE, TRUE, 4),
('Deimos 2', 4500, 23460, 1.351, 'The smaller and more distant of Mars"s two moons.', FALSE, TRUE, 4),
('Proxima b Moon 2', 4500, 42400, 1.0, 'A moon orbiting Proxima b.', FALSE, TRUE, 5),
('Proxima c Moon 2', 4500, 42400, 1.0, 'A moon orbiting Proxima c.', FALSE, TRUE, 6),
('Sirius b Moon 2', 300, 86100, 1.0, 'A moon orbiting Sirius b.', FALSE, TRUE, 7),
('Sirius c Moon 2', 300, 86100, 1.0, 'A moon orbiting Sirius c.', FALSE, TRUE, 8),
('Betelgeuse b Moon 2', 10000, 642500, 1.0, 'A moon orbiting Betelgeuse b.', FALSE, TRUE, 9),
('Betelgeuse c Moon 2', 10000, 642500, 1.0, 'A moon orbiting Betelgeuse c.', FALSE, TRUE, 10),
('Rigel b Moon 2', 8000, 863, 1.0, 'A moon orbiting Rigel b.', FALSE, TRUE, 11),
('Rigel c Moon 2', 8000, 863, 1.0, 'A moon orbiting Rigel c.', FALSE, TRUE, 12);

-- add 6 rows for mission table foreign key constraints with moon_id
INSERT INTO mission (name, launch_date, duration_in_days, crew_size, description, budget_in_millions_of_dollars, successful, is_manned, moon_id) 
VALUES
('Apollo 11', '1969-07-16', 8, 3, 'First manned mission to land on the Moon.', 355, TRUE, TRUE, 1),
('Apollo 12', '1969-11-14', 10, 3, 'Second manned mission to land on the Moon.', 375, TRUE, TRUE, 1),
('Apollo 13', '1970-04-11', 6, 3, 'Third manned mission to land on the Moon.', 355, FALSE, TRUE, 1),
('Apollo 14', '1971-01-31', 9, 3, 'Fourth manned mission to land on the Moon.', 375, TRUE, TRUE, 1),
('Apollo 15', '1971-07-26', 12, 3, 'Fifth manned mission to land on the Moon.', 355, TRUE, TRUE, 1),
('Apollo 16', '1972-04-16', 11, 3, 'Sixth manned mission to land on the Moon.', 375, TRUE, TRUE, 1);