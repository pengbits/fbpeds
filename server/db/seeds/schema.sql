--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Postgres.app)
-- Dumped by pg_dump version 17.4 (Postgres.app)

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

