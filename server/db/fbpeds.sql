--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Postgres.app)
-- Dumped by pg_dump version 17.4 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: appointments; Type: TABLE; Schema: public; Owner: fbpeds_user
--

CREATE TABLE public.appointments (
    appointment_id integer NOT NULL,
    datetime timestamp with time zone NOT NULL,
    patient_id integer NOT NULL,
    provider_id integer NOT NULL,
    visit_type character varying(5),
    CONSTRAINT valid_visit_type CHECK (((visit_type)::text = ANY ((ARRAY['WELL'::character varying, 'SICK'::character varying])::text[])))
);


ALTER TABLE public.appointments OWNER TO fbpeds_user;

--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: fbpeds_user
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointments_id_seq OWNER TO fbpeds_user;

--
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbpeds_user
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.appointment_id;


--
-- Name: growth; Type: TABLE; Schema: public; Owner: fbpeds_user
--

CREATE TABLE public.growth (
    growth_id integer NOT NULL,
    age_years integer,
    height real,
    weight real,
    height_percent real,
    weight_percent real,
    bmi_percent real,
    patient_id integer,
    date date NOT NULL
);


ALTER TABLE public.growth OWNER TO fbpeds_user;

--
-- Name: growth_merged_growth_id_seq; Type: SEQUENCE; Schema: public; Owner: fbpeds_user
--

CREATE SEQUENCE public.growth_merged_growth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.growth_merged_growth_id_seq OWNER TO fbpeds_user;

--
-- Name: growth_merged_growth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbpeds_user
--

ALTER SEQUENCE public.growth_merged_growth_id_seq OWNED BY public.growth.growth_id;


--
-- Name: immunizations; Type: TABLE; Schema: public; Owner: fbpeds_user
--

CREATE TABLE public.immunizations (
    immunization_id integer NOT NULL,
    date date,
    type character varying(20),
    patient_id integer
);


ALTER TABLE public.immunizations OWNER TO fbpeds_user;

--
-- Name: immunizations_id_seq; Type: SEQUENCE; Schema: public; Owner: fbpeds_user
--

CREATE SEQUENCE public.immunizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.immunizations_id_seq OWNER TO fbpeds_user;

--
-- Name: immunizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbpeds_user
--

ALTER SEQUENCE public.immunizations_id_seq OWNED BY public.immunizations.immunization_id;


--
-- Name: patients; Type: TABLE; Schema: public; Owner: fbpeds_user
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    birthdate date,
    last_image date
);


ALTER TABLE public.patients OWNER TO fbpeds_user;

--
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: fbpeds_user
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.patients_id_seq OWNER TO fbpeds_user;

--
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbpeds_user
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- Name: pharmacies; Type: TABLE; Schema: public; Owner: fbpeds_user
--

CREATE TABLE public.pharmacies (
    id integer NOT NULL,
    name character varying(25),
    address text,
    phone character varying(20)
);


ALTER TABLE public.pharmacies OWNER TO fbpeds_user;

--
-- Name: pharmacies_id_seq; Type: SEQUENCE; Schema: public; Owner: fbpeds_user
--

CREATE SEQUENCE public.pharmacies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pharmacies_id_seq OWNER TO fbpeds_user;

--
-- Name: pharmacies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbpeds_user
--

ALTER SEQUENCE public.pharmacies_id_seq OWNED BY public.pharmacies.id;


--
-- Name: prescriptions; Type: TABLE; Schema: public; Owner: fbpeds_user
--

CREATE TABLE public.prescriptions (
    prescription_id integer NOT NULL,
    date date,
    directions text,
    patient_id integer,
    prescription_name character varying(50),
    pharmacy_id integer
);


ALTER TABLE public.prescriptions OWNER TO fbpeds_user;

--
-- Name: prescriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: fbpeds_user
--

CREATE SEQUENCE public.prescriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.prescriptions_id_seq OWNER TO fbpeds_user;

--
-- Name: prescriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbpeds_user
--

ALTER SEQUENCE public.prescriptions_id_seq OWNED BY public.prescriptions.prescription_id;


--
-- Name: providers; Type: TABLE; Schema: public; Owner: fbpeds_user
--

CREATE TABLE public.providers (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    about text,
    medical_degree character varying(10),
    has_image boolean
);


ALTER TABLE public.providers OWNER TO fbpeds_user;

--
-- Name: providers_id_seq; Type: SEQUENCE; Schema: public; Owner: fbpeds_user
--

CREATE SEQUENCE public.providers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.providers_id_seq OWNER TO fbpeds_user;

--
-- Name: providers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbpeds_user
--

ALTER SEQUENCE public.providers_id_seq OWNED BY public.providers.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: fbpeds_user
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO fbpeds_user;

--
-- Name: users; Type: TABLE; Schema: public; Owner: fbpeds_user
--

CREATE TABLE public.users (
    username text,
    id integer NOT NULL,
    salt bytea,
    hashed_password bytea
);


ALTER TABLE public.users OWNER TO fbpeds_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: fbpeds_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO fbpeds_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbpeds_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visits; Type: TABLE; Schema: public; Owner: fbpeds_user
--

CREATE TABLE public.visits (
    visit_id integer NOT NULL,
    visit_date date,
    patient_id integer NOT NULL,
    visit_type text,
    provider_id integer,
    has_image boolean,
    CONSTRAINT valid_visit_type CHECK ((visit_type = ANY (ARRAY['WELL'::text, 'SICK'::text])))
);


ALTER TABLE public.visits OWNER TO fbpeds_user;

--
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: fbpeds_user
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.visits_id_seq OWNER TO fbpeds_user;

--
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbpeds_user
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.visit_id;


--
-- Name: appointments appointment_id; Type: DEFAULT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.appointments ALTER COLUMN appointment_id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- Name: growth growth_id; Type: DEFAULT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.growth ALTER COLUMN growth_id SET DEFAULT nextval('public.growth_merged_growth_id_seq'::regclass);


--
-- Name: immunizations immunization_id; Type: DEFAULT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.immunizations ALTER COLUMN immunization_id SET DEFAULT nextval('public.immunizations_id_seq'::regclass);


--
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- Name: pharmacies id; Type: DEFAULT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.pharmacies ALTER COLUMN id SET DEFAULT nextval('public.pharmacies_id_seq'::regclass);


--
-- Name: prescriptions prescription_id; Type: DEFAULT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.prescriptions ALTER COLUMN prescription_id SET DEFAULT nextval('public.prescriptions_id_seq'::regclass);


--
-- Name: providers id; Type: DEFAULT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.providers ALTER COLUMN id SET DEFAULT nextval('public.providers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visits visit_id; Type: DEFAULT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.visits ALTER COLUMN visit_id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: fbpeds_user
--

COPY public.appointments (appointment_id, datetime, patient_id, provider_id, visit_type) FROM stdin;
523	2025-04-25 09:45:00-04	1	2	WELL
526	2025-04-30 13:45:00-04	3	1	SICK
527	2025-05-21 12:35:00-04	1	2	SICK
\.


--
-- Data for Name: growth; Type: TABLE DATA; Schema: public; Owner: fbpeds_user
--

COPY public.growth (growth_id, age_years, height, weight, height_percent, weight_percent, bmi_percent, patient_id, date) FROM stdin;
1	0	\N	9.2	\N	92	0	2	2017-05-24
2	5	26.1	14.5	63	15	14.96	3	2022-05-13
3	8	52.6	67.3	82	81	17.1	1	2022-08-26
4	14	31.9	21.8	92	47	15.06	3	2023-02-01
5	2	36.1	28.1	87	51	15.17	2	2019-06-03
6	2	34.3	26.3	94	75	15.72	2	2018-12-06
7	2	37	30.3	101	86	15.53	1	2016-08-18
8	10	57.9	\N	85	\N	\N	1	2024-11-18
9	1	32.5	24.1	93	73	16.06	2	2018-08-09
10	10	29.5	19.8	75	41	15.99	3	2022-10-24
11	4	42.4	43.1	92	92	16.87	1	2018-08-28
12	4	41.3	36.6	49	40	15.08	2	2021-10-25
13	7	50	61	82	85	17.15	1	2021-08-26
14	0	20.3	8	69	65	13.65	3	2021-12-22
15	0	21	8.2	99	84	13.06	1	2014-08-12
16	3	38.6	33	60	54	15.57	1	2020-08-21
17	8	48.6	49.3	39	27	14.67	2	2024-12-06
18	3	38.4	31.9	82	63	15.21	3	2024-09-18
19	5	45	50	89	92	17.36	1	2019-08-29
20	0	24.7	14.7	98	91	16.93	2	2017-07-24
21	0	\N	10.3	\N	95	0	2	2017-06-05
22	5	44	39	49	24	14.16	2	2022-11-09
23	7	46.4	44.2	45	26	14.43	2	2023-11-29
24	0	\N	9	\N	89	0	2	2017-05-25
25	2	36	27.7	83	44	15.03	3	2024-01-12
26	1	\N	8.9	\N	51	0	3	2022-01-07
27	0	27.3	18.2	101	89	17.16	2	2017-09-28
28	0	21	9.6	96	97	15.3	2	2017-05-22
29	2	24.4	11.7	92	25	13.82	3	2022-02-24
30	3	39.7	35	89	77	15.61	3	2025-01-29
31	1	\N	22.7	\N	57	0	2	2018-07-20
32	0	22.8	12.4	90	92	16.77	2	2017-06-26
33	0	26.9	16.7	101	91	16.21	2	2017-08-24
34	3	39.4	37.1	93	92	16.81	1	2017-08-18
35	0	20	8.1	67	73	14.22	3	2021-12-18
36	1	29.3	20.3	94	70	16.63	2	2018-01-29
37	9	55.1	72	83	69	16.67	1	2023-10-04
\.


--
-- Data for Name: immunizations; Type: TABLE DATA; Schema: public; Owner: fbpeds_user
--

COPY public.immunizations (immunization_id, date, type, patient_id) FROM stdin;
3	2015-12-31	DTaP+	1
4	2015-04-27	DTaP+	1
5	2014-12-22	DTaP+	1
6	2014-10-20	DTaP+	1
7	2019-08-29	FLU-IIV4 6m+ pf	1
8	2018-11-29	FLU-IIV4 3yrs+ pf	1
9	2015-12-31	HIB-PRP-T	1
10	2015-04-27	HIB-PRP-T	1
11	2015-01-20	HIB-PRP-T	1
12	2014-11-20	HIB-PRP-T	1
13	2018-08-28	IPV	1
14	2015-09-16	IPV	1
15	2014-12-22	IPV	1
16	2014-10-20	IPV	1
17	2017-08-18	MMR	1
18	2016-03-18	MMR	1
19	2015-12-31	PCV13	1
20	2015-04-27	PCV13	1
21	2015-01-20	PCV13	1
22	2014-11-20	PCV13	1
23	2014-12-22	RotaVirus	1
24	2014-10-20	RotaVirus	1
25	2017-08-18	Var	1
26	2016-03-18	Var	1
2	2018-08-28	DTaP+	1
28	2022-08-26	DTaP+	2
29	2018-12-06	DTaP+	2
30	2018-01-29	DTaP-HIB-IPV	2
31	2017-09-28	DTaP-HIB-IPV	2
32	2017-07-24	DTaP-HIB-IPV	2
33	2021-10-25	FLU-IIV4 6m+ pf	2
34	2020-11-04	FLU-IIV4 6m+ pf	2
35	2019-11-07	FLU-IIV4 6m+ pf	2
36	2019-10-10	FLU-IIV4 6m+ pf	2
37	2018-12-06	HIB-PRP-T	2
38	2018-01-29	DTaP-HIB-IPV	2
39	2017-09-28	DTaP-HIB-IPV	2
40	2017-07-24	DTaP-HIB-IPV	2
41	2019-06-03	HepA 2dose	2
42	2018-08-09	HepB	2
43	2017-08-24	HepB	2
44	2017-06-26	HepB	2
45	2022-08-26	IPV	2
46	2018-01-29	DTaP-HIB-IPV	2
47	2017-09-28	DTaP-HIB-IPV	2
48	2017-07-24	DTaP-HIB-IPV	2
49	2020-08-21	MMR	2
50	2018-08-09	MMR	2
51	2018-12-06	PCV13	2
52	2018-01-29	PCV13	2
53	2017-10-26	PCV13	2
54	2017-08-24	PCV13	2
55	2017-09-28	RotaVirus	2
56	2017-07-24	RotaVirus	2
57	2020-08-21	Var	2
58	2018-08-09	Var	2
59	2025-01-29	DTaP+	3
60	2024-01-12	DTaP-HepB-IPV-HIB	3
61	2023-04-05	DTaP	3
62	2024-01-12	DTaP-HepB-IPV-HIB	3
63	2024-01-12	DTaP-HepB-IPV-HIB	3
64	2022-10-24	IPV	3
65	2024-01-12	DTaP-HepB-IPV-HIB	3
66	2023-04-05	HepB	3
67	2025-01-29	FLU-IIV3-24 6m+ pf	3
68	2024-10-31	FLU-IIV3-24 6m+ pf	3
69	2023-05-11	MMR	3
70	2022-10-24	PCV13	3
71	2022-05-13	PCV13	3
72	2022-02-24	PCV13	3
73	2024-09-18	PCV20	3
74	2023-05-11	Var	3
\.


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: fbpeds_user
--

COPY public.patients (id, name, birthdate, last_image) FROM stdin;
1	Laila Paul	2014-08-12	2023-10-04
2	Oskar Paul	2017-05-22	2023-11-29
3	Desmond Paul	2021-12-18	2025-01-29
\.


--
-- Data for Name: pharmacies; Type: TABLE DATA; Schema: public; Owner: fbpeds_user
--

COPY public.pharmacies (id, name, address, phone) FROM stdin;
1	OLYMPE PHARMACY	1665 Nostrand Ave, Brooklyn, NY, 11226	(718) 484-7070
2	Duane Reade	1517 Cortelyou Rd, Brooklyn, NY, 11226	(718) 287-9078
\.


--
-- Data for Name: prescriptions; Type: TABLE DATA; Schema: public; Owner: fbpeds_user
--

COPY public.prescriptions (prescription_id, date, directions, patient_id, prescription_name, pharmacy_id) FROM stdin;
2	2025-01-20	triamcinolone acetonide ointment 0.025 % Dispense: 1 (one) each Apply topically twice a day for 14 days as needed	3	triamcinolone acetonide\t	1
3	2023-05-11	mupirocin ointment 2 % Dispense: 1 (one) each Apply topically three times a day for 10 days	3	mupirocin\t	1
4	2023-05-11	triamcinolone acetonide ointment 0.025 % Dispense: 1 (one) each Apply twice a day topically as directed for 14 days	3	triamcinolone acetonide\t	1
5	2023-04-05	mupirocin ointment 2 % Dispense: 1 (one) unspecified Apply topically three times a day for 10 days	3	mupirocin\t	1
6	2022-01-03	cholecalciferol (vitamin D3) drops 10 mcg/mL (400 unit/mL) Dispense: 1 (one) unspecified Take 1 mL by mouth once a day for 30 days	3	cholecalciferol (vitamin D3)\t	1
7	2023-10-23	Silvadene cream 1 % Dispense: 1 (one) each Apply topically twice a day for 14 days	2	Silvadene\t	1
1	2024-11-18	Nystatin Ointment 100,000 unit/g Dispense: 1 (one) tube apply topically to affected area TID x 10-14 days	1	nystatin	2
8	2017-12-06	Albuterol Sulfate Nebu Soln 0.083% Dispense: 1 (one) box 1 vial via neb q 4-6hr prn wheezing < 5yo. Cost:$0.63/3 mL.	2	Albuterol Sulfate	2
9	2017-12-06	Pulmo-Aide Compressor Each Dispense: 1 (one) unspecified as directed may substitute with equivalent nebulizer	2	Pulmo-Aide Compressor	2
\.


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: fbpeds_user
--

COPY public.providers (id, name, about, medical_degree, has_image) FROM stdin;
4	Samara Wright, PNP	-Undergraduate: George Washington University\r\n-Graduate School: New York University\r\n\r\nQ&A with Samara Wright\r\n\r\nHow did you get into pediatrics?\r\nInitially I was interested in becoming a midwife but over the course of my training and work experiences I was drawn to pediatrics. I think pediatrics found me! It’s a privilege to watch kids grow and evolve into themselves. Also, children are so much fun and I love seeing things from their perspective.\r\n\r\nWhere did you grow up?\r\nPrinceton, New Jersey\r\n\r\nWhere do you live?\r\nBrooklyn, New York\r\n\r\nWhat do you enjoy most about working in your neighborhood office?\r\nEstablishing connections with patients and colleagues and being a part of the community.\r\n\r\nWhat keeps you motivated?\r\nMy family and my patients. I am always learning from my patients and this keeps me motivated.\r\n\r\nWhat do you do for fun?\r\nEqual parts of cozying up with a good book or movie and going on urban adventures. I also love to cook and attempt to recreate things I’ve tried in restaurants!	PNP	f
1	Dr. Augustine Gaw	-Undergraduate: University of California, Berkeley, CA\r\n-Medical School: Touro University Nevada, Henderson, NV\r\n-Residency: SUNY Downstate Medical Center, Brooklyn, NY\r\n\r\nQ & A with Dr. Augustine Gaw\r\n\r\nHow did you get into pediatrics?\r\nWhen I was in medical school, I rotated through the different departments and specialties, and I really enjoyed caring for pediatric patients the most.\r\n\r\nWhere did you grow up?\r\nI grew up in Phoenix, AZ.\r\n\r\nWhere do you live?\r\nI live in Brooklyn.\r\n\r\nWhat do you enjoy most about working in your neighborhood office?\r\nI like the diversity of the patient population in our community.\r\n\r\nWhat keeps you motivated?\r\nWhen I feel like I’ve made a bond with a family and build that rapport while taking care of their children.\r\n\r\nWhat do you do for fun?\r\nI love cooking, traveling, and working out.	DO	t
2	Dr. Karen Teoh	-Undergraduate: Binghamton University, Binghamton, NY\r\n-Medical School: SUNY Upstate Medical University, Syracuse, NY\r\n-Residency: Rutgers Robert Wood Johnson Medical School, New Brunswick, New Jersey\r\n\r\nQ & A with Dr. Karen Teoh\r\n\r\nHow did you get into pediatrics?\r\nI love working with kids! Their curiosity and unique views are a recipe for laughter.\r\n\r\nWhere did you grow up?\r\nBrooklyn, NY.\r\n\r\nWhere do you live?\r\nI live in Brooklyn.\r\n\r\nWhat do you enjoy most about working in Ditmas Park?\r\nI look forward to exploring the area and trying out the restaurants.\r\n\r\nWhat keeps you motivated?\r\nHelping children grow healthy so that they can reach their goals!\r\n\r\nWhat do you do for fun?\r\nI love traveling and trying new food, biking, and cooking.	MD, PhD	t
3	Dr. Miyoko Onishi	-Undergraduate: Keio University, Tokyo, Japan\r\n-Graduate School: University of California, Santa Cruz, CA\r\n-Medical School: St. George’s University School of Medicine, Grenada\r\n-Residency: SUNY Downstate Medical Center, Brooklyn, NY\r\n-Second Languages: Japanese\r\n\r\nQ & A with Dr. Miyoko Onishi\r\n\r\nHow did you get into Pediatrics?\r\nI was always fascinated by child development and health-related issues in children, so after completing my Ph.D in developmental psychology and MD program, it came natural to me to become a pediatrician to promote and support healthy development in children and families.\r\n\r\nWhere did you grow up?\r\nTokyo, Japan.\r\n\r\nWhere do you live?\r\nPark slope, Brooklyn.\r\n\r\nWhat do you enjoy most about working in Ditmas Park?\r\nMeeting the children and their families in the community, and providing care for their bright future!\r\n\r\nWhat keeps you motivated?\r\nA kids’ smile!\r\n\r\nWhat do you do for fun?\r\nCooking, traveling, and watching Japanese dramas.	MD	t
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: fbpeds_user
--

COPY public.session (sid, sess, expire) FROM stdin;
ZY3LhDyXsBhNpupgxUL_bWy65bLpMhG9	{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id":12,"username":"admin"}},"messages":[]}	2025-05-02 08:03:08
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: fbpeds_user
--

COPY public.users (username, id, salt, hashed_password) FROM stdin;
admin	12	\\x3c513effadd08a428e1c528aee43a365	\\x483267f7e562fb940f534a372668d3e1d422a5cb4a3d6d182704db8b1fa1638d
pengbits	13	\\xb02200d27d31a87a6698da68c3f38628	\\x3d254abfcebf291ac2483675c289cc64678d29bf6c21a881b0f95b2e8d149ba3
\.


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: fbpeds_user
--

COPY public.visits (visit_id, visit_date, patient_id, visit_type, provider_id, has_image) FROM stdin;
122	2017-07-25	1	WELL	3	\N
123	2017-08-18	1	WELL	3	\N
124	2017-09-20	1	SICK	3	\N
125	2018-01-29	1	SICK	3	\N
126	2018-08-27	1	WELL	3	\N
127	2018-08-28	1	WELL	3	\N
128	2019-01-29	1	SICK	3	\N
129	2019-05-10	1	SICK	3	\N
130	2019-08-29	1	WELL	3	\N
131	2020-06-30	1	SICK	3	\N
132	2020-08-21	1	WELL	3	\N
134	2022-01-20	1	SICK	3	\N
136	2023-05-19	1	SICK	3	\N
137	2023-08-08	1	SICK	3	\N
139	2024-03-04	1	SICK	3	\N
140	2024-05-22	1	SICK	3	\N
141	2024-11-18	1	WELL	3	\N
142	2020-06-30	2	SICK	3	\N
143	2020-08-21	2	WELL	3	\N
144	2020-09-03	2	SICK	3	\N
145	2020-09-30	2	SICK	3	\N
146	2020-12-11	2	WELL	3	\N
147	2021-06-15	2	SICK	3	\N
149	2022-01-08	2	SICK	3	\N
150	2022-01-12	2	SICK	3	\N
151	2022-08-12	2	SICK	3	\N
153	2023-10-23	2	SICK	3	\N
155	2024-03-18	2	SICK	3	\N
156	2024-12-06	2	WELL	3	\N
157	2021-12-22	3	WELL	1	\N
158	2021-12-22	3	WELL	1	\N
159	2022-01-05	3	SICK	1	\N
160	2022-01-07	3	SICK	1	\N
161	2022-01-24	3	WELL	1	\N
162	2022-02-04	3	WELL	1	\N
164	2022-05-13	3	WELL	1	\N
165	2022-09-01	3	WELL	1	\N
167	2022-10-31	3	WELL	1	\N
168	2022-11-10	3	SICK	1	\N
169	2023-02-01	3	WELL	1	\N
170	2023-04-05	3	SICK	1	\N
171	2023-05-11	3	WELL	1	\N
173	2024-03-18	3	SICK	1	\N
174	2024-06-03	3	SICK	1	\N
176	2025-01-20	3	SICK	1	\N
138	2023-10-04	1	WELL	3	t
135	2022-08-26	1	WELL	3	t
133	2021-08-26	1	WELL	3	t
148	2021-10-25	2	WELL	3	t
152	2022-11-09	2	WELL	3	t
154	2023-11-29	2	WELL	3	t
163	2022-02-24	3	WELL	1	t
166	2022-10-24	3	WELL	1	t
172	2024-01-12	3	WELL	1	t
175	2024-09-18	3	WELL	1	t
177	2025-01-29	3	WELL	1	t
\.


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fbpeds_user
--

SELECT pg_catalog.setval('public.appointments_id_seq', 527, true);


--
-- Name: growth_merged_growth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fbpeds_user
--

SELECT pg_catalog.setval('public.growth_merged_growth_id_seq', 37, true);


--
-- Name: immunizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fbpeds_user
--

SELECT pg_catalog.setval('public.immunizations_id_seq', 74, true);


--
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fbpeds_user
--

SELECT pg_catalog.setval('public.patients_id_seq', 5, true);


--
-- Name: pharmacies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fbpeds_user
--

SELECT pg_catalog.setval('public.pharmacies_id_seq', 1, false);


--
-- Name: prescriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fbpeds_user
--

SELECT pg_catalog.setval('public.prescriptions_id_seq', 9, true);


--
-- Name: providers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fbpeds_user
--

SELECT pg_catalog.setval('public.providers_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fbpeds_user
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fbpeds_user
--

SELECT pg_catalog.setval('public.visits_id_seq', 177, true);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (appointment_id);


--
-- Name: growth growth_merged_pkey; Type: CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.growth
    ADD CONSTRAINT growth_merged_pkey PRIMARY KEY (growth_id);


--
-- Name: immunizations immunizations_pkey; Type: CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.immunizations
    ADD CONSTRAINT immunizations_pkey PRIMARY KEY (immunization_id);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- Name: pharmacies pharmacies_pkey; Type: CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.pharmacies
    ADD CONSTRAINT pharmacies_pkey PRIMARY KEY (id);


--
-- Name: prescriptions prescriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.prescriptions
    ADD CONSTRAINT prescriptions_pkey PRIMARY KEY (prescription_id);


--
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (visit_id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: fbpeds_user
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: appointments fk_appointment_patient; Type: FK CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT fk_appointment_patient FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- Name: appointments fk_appointment_provider; Type: FK CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT fk_appointment_provider FOREIGN KEY (provider_id) REFERENCES public.providers(id);


--
-- Name: visits patient_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT patient_id_fk FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- Name: prescriptions patient_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.prescriptions
    ADD CONSTRAINT patient_id_fk FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- Name: immunizations patient_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.immunizations
    ADD CONSTRAINT patient_id_fk FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- Name: growth patient_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.growth
    ADD CONSTRAINT patient_id_fk FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- Name: prescriptions pharmacy_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: fbpeds_user
--

ALTER TABLE ONLY public.prescriptions
    ADD CONSTRAINT pharmacy_id_fk FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(id);


--
-- PostgreSQL database dump complete
--

