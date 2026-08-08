/*
# Create increment_copy_count function

Creates a stored procedure to atomically increment the copies_count
column on a prompt when a user copies it.
*/

CREATE OR REPLACE FUNCTION increment_copy_count(prompt_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE prompts SET copies_count = copies_count + 1 WHERE id = prompt_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
