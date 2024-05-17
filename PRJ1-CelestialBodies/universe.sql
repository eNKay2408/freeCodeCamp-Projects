--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age_in_millions_of_years integer,
    distance_from_earth integer NOT NULL,
    speed_in_kmps numeric(10,2),
    description text,
    has_life boolean NOT NULL,
    is_spherical boolean
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: mission; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.mission (
    mission_id integer NOT NULL,
    name character varying(30) NOT NULL,
    launch_date date,
    duration_in_days integer NOT NULL,
    crew_size integer,
    description text,
    budget_in_millions_of_dollars numeric,
    successful boolean,
    is_manned boolean,
    moon_id integer
);


ALTER TABLE public.mission OWNER TO freecodecamp;

--
-- Name: mission_mission_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.mission_mission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mission_mission_id_seq OWNER TO freecodecamp;

--
-- Name: mission_mission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.mission_mission_id_seq OWNED BY public.mission.mission_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age_in_millions_of_years integer,
    distance_from_earth integer NOT NULL,
    speed_in_kmps numeric(10,2),
    description text,
    has_life boolean NOT NULL,
    is_spherical boolean,
    planet_id integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age_in_millions_of_years integer,
    distance_from_earth integer NOT NULL,
    speed_in_kmps numeric(10,2),
    description text,
    has_life boolean NOT NULL,
    is_spherical boolean,
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age_in_millions_of_years integer,
    distance_from_earth integer NOT NULL,
    speed_in_kmps numeric(10,2),
    description text,
    has_life boolean NOT NULL,
    is_spherical boolean,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: mission mission_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.mission ALTER COLUMN mission_id SET DEFAULT nextval('public.mission_mission_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 13600, 0, 552.00, 'Our home galaxy, containing the Solar System.', true, true);
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 10000, 2537000, 301.00, 'Nearest spiral galaxy to the Milky Way.', false, true);
INSERT INTO public.galaxy VALUES (3, 'Triangulum', 10000, 3000000, 179.00, 'A member of the Local Group of galaxies.', false, true);
INSERT INTO public.galaxy VALUES (4, 'Whirlpool', 500, 23000000, 150.00, 'A classic spiral galaxy with well-defined arms.', false, true);
INSERT INTO public.galaxy VALUES (5, 'Sombrero', 9000, 29000000, 102.00, 'Known for its bright nucleus and large central bulge.', false, true);
INSERT INTO public.galaxy VALUES (6, 'Cartwheel', 500, 500000000, 217.00, 'A ring galaxy with a distinctive cartwheel structure.', false, true);


--
-- Data for Name: mission; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.mission VALUES (1, 'Apollo 11', '1969-07-16', 8, 3, 'First manned mission to land on the Moon.', 355, true, true, 1);
INSERT INTO public.mission VALUES (2, 'Apollo 12', '1969-11-14', 10, 3, 'Second manned mission to land on the Moon.', 375, true, true, 1);
INSERT INTO public.mission VALUES (3, 'Apollo 13', '1970-04-11', 6, 3, 'Third manned mission to land on the Moon.', 355, false, true, 1);
INSERT INTO public.mission VALUES (4, 'Apollo 14', '1971-01-31', 9, 3, 'Fourth manned mission to land on the Moon.', 375, true, true, 1);
INSERT INTO public.mission VALUES (5, 'Apollo 15', '1971-07-26', 12, 3, 'Fifth manned mission to land on the Moon.', 355, true, true, 1);
INSERT INTO public.mission VALUES (6, 'Apollo 16', '1972-04-16', 11, 3, 'Sixth manned mission to land on the Moon.', 375, true, true, 1);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', 4500, 384400, 1.02, 'Earth"s only natural satellite.', false, true, 3);
INSERT INTO public.moon VALUES (2, 'Phobos', 4500, 9377, 2.14, 'The larger and closer of Mars"s two moons.', false, true, 4);
INSERT INTO public.moon VALUES (3, 'Deimos', 4500, 23460, 1.35, 'The smaller and more distant of Mars"s two moons.', false, true, 4);
INSERT INTO public.moon VALUES (4, 'Proxima b Moon', 4500, 42400, 1.00, 'A moon orbiting Proxima b.', false, true, 5);
INSERT INTO public.moon VALUES (5, 'Proxima c Moon', 4500, 42400, 1.00, 'A moon orbiting Proxima c.', false, true, 6);
INSERT INTO public.moon VALUES (6, 'Sirius b Moon', 300, 86100, 1.00, 'A moon orbiting Sirius b.', false, true, 7);
INSERT INTO public.moon VALUES (7, 'Sirius c Moon', 300, 86100, 1.00, 'A moon orbiting Sirius c.', false, true, 8);
INSERT INTO public.moon VALUES (8, 'Betelgeuse b Moon', 10000, 642500, 1.00, 'A moon orbiting Betelgeuse b.', false, true, 9);
INSERT INTO public.moon VALUES (9, 'Betelgeuse c Moon', 10000, 642500, 1.00, 'A moon orbiting Betelgeuse c.', false, true, 10);
INSERT INTO public.moon VALUES (10, 'Rigel b Moon', 8000, 863, 1.00, 'A moon orbiting Rigel b.', false, true, 11);
INSERT INTO public.moon VALUES (11, 'Rigel c Moon', 8000, 863, 1.00, 'A moon orbiting Rigel c.', false, true, 12);
INSERT INTO public.moon VALUES (12, 'Moon 2', 4500, 384400, 1.02, 'Earth"s second natural satellite.', false, true, 3);
INSERT INTO public.moon VALUES (13, 'Phobos 2', 4500, 9377, 2.14, 'The larger and closer of Mars"s two moons.', false, true, 4);
INSERT INTO public.moon VALUES (14, 'Deimos 2', 4500, 23460, 1.35, 'The smaller and more distant of Mars"s two moons.', false, true, 4);
INSERT INTO public.moon VALUES (15, 'Proxima b Moon 2', 4500, 42400, 1.00, 'A moon orbiting Proxima b.', false, true, 5);
INSERT INTO public.moon VALUES (16, 'Proxima c Moon 2', 4500, 42400, 1.00, 'A moon orbiting Proxima c.', false, true, 6);
INSERT INTO public.moon VALUES (17, 'Sirius b Moon 2', 300, 86100, 1.00, 'A moon orbiting Sirius b.', false, true, 7);
INSERT INTO public.moon VALUES (18, 'Sirius c Moon 2', 300, 86100, 1.00, 'A moon orbiting Sirius c.', false, true, 8);
INSERT INTO public.moon VALUES (19, 'Betelgeuse b Moon 2', 10000, 642500, 1.00, 'A moon orbiting Betelgeuse b.', false, true, 9);
INSERT INTO public.moon VALUES (20, 'Betelgeuse c Moon 2', 10000, 642500, 1.00, 'A moon orbiting Betelgeuse c.', false, true, 10);
INSERT INTO public.moon VALUES (21, 'Rigel b Moon 2', 8000, 863, 1.00, 'A moon orbiting Rigel b.', false, true, 11);
INSERT INTO public.moon VALUES (22, 'Rigel c Moon 2', 8000, 863, 1.00, 'A moon orbiting Rigel c.', false, true, 12);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 4500, 91700000, 47.87, 'The smallest planet in the Solar System.', false, true, 1);
INSERT INTO public.planet VALUES (2, 'Venus', 4500, 41400000, 35.02, 'The hottest planet in the Solar System.', false, true, 1);
INSERT INTO public.planet VALUES (3, 'Earth', 4500, 0, 29.78, 'The only planet known to support life.', true, true, 1);
INSERT INTO public.planet VALUES (4, 'Mars', 4500, 78340000, 24.08, 'Known as the Red Planet.', false, true, 1);
INSERT INTO public.planet VALUES (5, 'Proxima b', 4500, 42400, 5.00, 'An exoplanet orbiting Proxima Centauri.', false, true, 2);
INSERT INTO public.planet VALUES (6, 'Proxima c', 4500, 42400, 4.00, 'A second exoplanet orbiting Proxima Centauri.', false, true, 2);
INSERT INTO public.planet VALUES (7, 'Sirius b', 300, 86100, 5.50, 'A white dwarf orbiting Sirius A.', false, true, 3);
INSERT INTO public.planet VALUES (8, 'Sirius c', 300, 86100, 6.00, 'A hypothetical planet orbiting Sirius A.', false, true, 3);
INSERT INTO public.planet VALUES (9, 'Betelgeuse b', 10000, 642500, 20.00, 'A planet orbiting the red supergiant Betelgeuse.', false, true, 4);
INSERT INTO public.planet VALUES (10, 'Betelgeuse c', 10000, 642500, 25.00, 'Another planet orbiting Betelgeuse.', false, true, 4);
INSERT INTO public.planet VALUES (11, 'Rigel b', 8000, 863, 10.00, 'A gas giant orbiting Rigel.', false, true, 5);
INSERT INTO public.planet VALUES (12, 'Rigel c', 8000, 863, 11.00, 'Another gas giant orbiting Rigel.', false, true, 5);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 4600, 0, 220.00, 'The star at the center of the Solar System.', true, true, 1);
INSERT INTO public.star VALUES (2, 'Proxima Centauri', 4500, 42400, 320.00, 'The closest known star to the Sun.', false, true, 2);
INSERT INTO public.star VALUES (3, 'Sirius', 300, 86100, 250.00, 'The brightest star in the Earth"s night sky.', false, true, 3);
INSERT INTO public.star VALUES (4, 'Betelgeuse', 10000, 642500, 20.00, 'A red supergiant star in the constellation of Orion.', false, true, 4);
INSERT INTO public.star VALUES (5, 'Rigel', 8000, 863, 240.00, 'A blue supergiant star in the constellation of Orion.', false, true, 5);
INSERT INTO public.star VALUES (6, 'Vega', 455, 25000, 180.00, 'A bright star in the constellation Lyra.', false, true, 6);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: mission_mission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.mission_mission_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 22, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: mission mission_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.mission
    ADD CONSTRAINT mission_name_key UNIQUE (name);


--
-- Name: mission mission_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.mission
    ADD CONSTRAINT mission_pkey PRIMARY KEY (mission_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: mission mission_moon_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.mission
    ADD CONSTRAINT mission_moon_id_fkey FOREIGN KEY (moon_id) REFERENCES public.moon(moon_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

