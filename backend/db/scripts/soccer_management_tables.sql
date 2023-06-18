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

CREATE SEQUENCE public.field_field_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100000
    CACHE 1;

ALTER SEQUENCE public.field_field_id_seq OWNER TO postgres;


CREATE SEQUENCE public.match_match_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100000
    CACHE 1;

ALTER SEQUENCE public.match_match_id_seq OWNER TO postgres;


CREATE SEQUENCE public.payment_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100000
    CACHE 1;

ALTER SEQUENCE public.payment_payment_id_seq OWNER TO postgres;


CREATE SEQUENCE public.referee_referee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100000
    CACHE 1;

ALTER SEQUENCE public.referee_referee_id_seq OWNER TO postgres;


CREATE SEQUENCE public.teams_team_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000
    CACHE 1;


ALTER SEQUENCE public.teams_team_id_seq OWNER TO postgres;


CREATE SEQUENCE public.tournament_tournament_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000
    CACHE 1;

ALTER SEQUENCE public.tournament_tournament_id_seq OWNER TO postgres;


CREATE SEQUENCE public.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000
    CACHE 1;

ALTER SEQUENCE public.user_user_id_seq OWNER TO postgres;




SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.users (
    user_id integer DEFAULT nextval('public.user_user_id_seq'::regclass) NOT NULL,
    username character varying(256) NOT NULL,
    password character varying(256) NOT NULL,
    user_role character varying(256) NOT NULL,
    is_admin boolean DEFAULT true NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (username),
    CONSTRAINT user_id_unq UNIQUE (user_id)
);

ALTER TABLE public.users OWNER TO postgres;


CREATE TABLE public.field (
    field_id integer DEFAULT nextval('public.field_field_id_seq'::regclass) NOT NULL,
    field_name character varying(256) NOT NULL,
    field_acronym character varying(20) NOT NULL,
    field_location character varying(256) NOT NULL,
    num_of_grounds integer,
    is_active boolean DEFAULT true NOT NULL,
    CONSTRAINT field_pkey PRIMARY KEY (field_id)
);

ALTER TABLE public.field OWNER TO postgres;


CREATE TABLE public.grounds_fields (
    field_id integer NOT NULL,
    ground_number integer NOT NULL,
    age_start integer NOT NULL,
    age_end integer NOT NULL,
    is_active boolean DEFAULT true,
    CONSTRAINT grounds_field_pkey PRIMARY KEY (field_id, ground_number),
    CONSTRAINT grounds_fields_field_id_fkey FOREIGN KEY (field_id) REFERENCES public.field(field_id)
);


ALTER TABLE public.grounds_fields OWNER TO postgres;


CREATE TABLE public.referee (
    referee_id integer DEFAULT nextval('public.referee_referee_id_seq'::regclass) NOT NULL,
    referee_name character varying(256) NOT NULL,
    referee_state character varying(2) NOT NULL,
    referee_city character varying(256) NOT NULL,
    referee_zip integer NOT NULL,
    referee_emailid character varying(100) NOT NULL,
    referee_age_group integer NOT NULL,
    referee_comfort_level character varying(2)[] NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    CONSTRAINT referee_pkey PRIMARY KEY (referee_id)
);

ALTER TABLE public.referee OWNER TO postgres;


CREATE TABLE public.teams (
    team_id integer DEFAULT nextval('public.teams_team_id_seq'::regclass) NOT NULL,
    team_name character varying(256) NOT NULL,
    gender "char" NOT NULL,
    age_group integer NOT NULL,
    division character varying(6) NOT NULL,
    coach_name character varying(256) NOT NULL,
    team_city character varying(256) NOT NULL,
    team_state character varying(2) NOT NULL,
    club_name character varying(256) NOT NULL,
    primary_contact numeric NOT NULL,
    team_details_file_path character varying(256) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    CONSTRAINT teams_pkey PRIMARY KEY (team_id),
    CONSTRAINT team_name_unq UNIQUE (team_name)
);

ALTER TABLE public.teams OWNER TO postgres;


CREATE TABLE public.payment (
    payment_id integer DEFAULT nextval('public.payment_payment_id_seq'::regclass) NOT NULL,
    payment_amount double precision NOT NULL,
    team_id integer NOT NULL,
    CONSTRAINT payment_pkey PRIMARY KEY (payment_id),
    CONSTRAINT payment_to_team_fkey FOREIGN KEY (team_id) 
        REFERENCES public.teams(team_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE public.payment OWNER TO postgres;


CREATE TABLE public.tournament (
    tournament_id integer DEFAULT nextval('public.tournament_tournament_id_seq'::regclass) NOT NULL,
    tournament_name character varying(256) NOT NULL,
    tournament_start_date date NOT NULL,
    tournament_end_date date NOT NULL,
    payment_due_date date NOT NULL,
    tournament_fee integer NOT NULL,
    tournament_winner integer,
    is_active boolean DEFAULT true NOT NULL,
    CONSTRAINT tournament_pkey PRIMARY KEY (tournament_id),
    CONSTRAINT tournament_winner FOREIGN KEY (tournament_winner) 
        REFERENCES public.teams(team_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


ALTER TABLE public.tournament OWNER TO postgres;


CREATE TABLE public.match (
    match_id integer DEFAULT nextval('public.match_match_id_seq'::regclass) NOT NULL,
    team_1_id integer NOT NULL,
    team_2_id integer NOT NULL,
    ground_number character varying NOT NULL,
    team_1_goal integer,
    team_2_goal integer,
    match_date date NOT NULL,
    match_time time without time zone NOT NULL,
    tournament_id integer NOT NULL,
    match_age_group integer NOT NULL,
    match_gender "char" NOT NULL,
    match_division character varying(10) NOT NULL,
    match_result character varying(4),
    match_stage character varying(20) NOT NULL,
    field_id integer NOT NULL,    
    CONSTRAINT match_pkey PRIMARY KEY (tournament_id, match_stage, team_1_id, team_2_id),
    CONSTRAINT tournament_id_fk FOREIGN KEY (tournament_id) 
        REFERENCES public.tournament(tournament_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT field_id_fk FOREIGN KEY (field_id) 
        REFERENCES public.field(field_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT team_1_fk FOREIGN KEY (team_1_id) 
        REFERENCES public.teams(team_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT team_2_fk FOREIGN KEY (team_2_id) 
        REFERENCES public.teams(team_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE public.match OWNER TO postgres;


