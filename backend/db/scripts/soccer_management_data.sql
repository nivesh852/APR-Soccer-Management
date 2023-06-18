INSERT INTO public.tournament (tournament_id, tournament_name, tournament_start_date, tournament_end_date, payment_due_date, tournament_fee, tournament_winner, is_active) VALUES (1, 'APR Fall Clasic', '2021-12-15', '2022-01-31', '2021-11-15', 200, NULL, true);


INSERT INTO public.field (field_id, field_name, field_acronym, field_location, num_of_grounds, is_active) VALUES (1, 'Warrior Soccer Complex', 'WSC', 'https://www.google.com/maps?oi=map&q=4081+Fishburg+Road+Dayton+OH+45424', 23, true);


INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (3, 1, 9, 13, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (4, 1, 9, 13, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (21, 1, 9, 13, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (22, 1, 9, 13, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (23, 1, 9, 13, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (13, 1, 14, 17, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (14, 1, 14, 17, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (15, 1, 14, 17, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (16, 1, 14, 17, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (19, 1, 14, 17, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (20, 1, 14, 17, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (1, 1, 18, 45, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (2, 1, 18, 45, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (9, 1, 18, 45, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (10, 1, 18, 45, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (11, 1, 18, 45, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (12, 1, 18, 45, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (17, 1, 18, 45, true);
INSERT INTO public.grounds_fields (ground_number, field_id, age_start, age_end, is_active) VALUES (18, 1, 18, 45, true);


INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (1, 'Team_1', 'M', 20, 'Red', 'Shashwat', 'Tempe', 'AZ', 'Shashwat Club', 1234567890, '/uploaded_files/Team1.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (2, 'Team_2', 'M', 20, 'Red', 'Aish', 'Tempe', 'AZ', 'Aish Club', 1234567890, '/uploaded_files/Team2.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (3, 'Team_3', 'M', 20, 'Red', 'Deepak', 'Tempe', 'AZ', 'Deepak Club', 1234567890, '/uploaded_files/Team3.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (4, 'Team_4', 'M', 20, 'Red', 'Kenil', 'Tempe', 'AZ', 'Kenil Club', 1234567890, '/uploaded_files/Team4.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (5, 'Team_5', 'M', 20, 'Red', 'Hari', 'Tempe', 'AZ', 'hari Club', 1234567890, '/uploaded_files/Team5.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (6, 'Team_6', 'M', 20, 'Red', 'John', 'Tempe', 'AZ', 'John Club', 1234567890, '/uploaded_files/Team6.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (7, 'Team_7', 'M', 20, 'Red', 'Roy', 'Tempe', 'AZ', 'Roy Club', 1234567890, '/uploaded_files/Team7.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (8, 'Team_8', 'M', 20, 'Red', 'Bob', 'Tempe', 'AZ', 'Bob Club', 1234567890, '/uploaded_files/Team8.pdf', true);

INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (9, 'Team_9', 'M', 20, 'Blue', 'Shashwat', 'Tempe', 'AZ', 'Shashwat Club', 1234567890, '/uploaded_files/Team9.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (10, 'Team_10', 'M', 20, 'Blue', 'Aish', 'Tempe', 'AZ', 'Aish Club', 1234567890, '/uploaded_files/Team10.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (11, 'Team_11', 'M', 20, 'Blue', 'Deepak', 'Tempe', 'AZ', 'Deepak Club', 1234567890, '/uploaded_files/Team11.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (12, 'Team_12', 'M', 20, 'Blue', 'Kenil', 'Tempe', 'AZ', 'Kenil Club', 1234567890, '/uploaded_files/Team12.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (13, 'Team_13', 'M', 20, 'Blue', 'Hari', 'Tempe', 'AZ', 'hari Club', 1234567890, '/uploaded_files/Team13.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (14, 'Team_14', 'M', 20, 'Blue', 'John', 'Tempe', 'AZ', 'John Club', 1234567890, '/uploaded_files/Team14.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (15, 'Team_15', 'M', 20, 'Blue', 'Roy', 'Tempe', 'AZ', 'Roy Club', 1234567890, '/uploaded_files/Team15.pdf', true);
INSERT INTO public.teams (team_id, team_name, gender, age_group, division, coach_name, team_city, team_state, club_name, primary_contact, team_details_file_path, is_active) VALUES (16, 'Team_16', 'M', 20, 'Blue', 'Bob', 'Tempe', 'AZ', 'Bob Club', 1234567890, '/uploaded_files/Team16.pdf', true);

INSERT INTO public.users (user_id, username, password, user_role, is_admin, is_active) VALUES (1, 'shashwat', 'password', 'tournament_manager', true, true);
