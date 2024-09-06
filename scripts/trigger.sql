use sims_ppob;
DELIMITER $$

CREATE TRIGGER update_balance_after_transactions
AFTER INSERT ON transactions
FOR EACH ROW
BEGIN
    IF NEW.service_code = 'TOPUP' THEN
        UPDATE memberships
        SET balance = balance + NEW.amount
        WHERE id = NEW.membership_id;
    ELSE
        UPDATE memberships
        SET balance = balance + (NEW.amount * NEW.qty)
        WHERE id = NEW.membership_id;
    END IF;
END$$

CREATE TRIGGER before_insert_transaction
BEFORE INSERT ON transactions
FOR EACH ROW
BEGIN
    DECLARE invoice_prefix VARCHAR(12);
    DECLARE invoice_sequence INT;
    
    SET invoice_prefix = CONCAT('INV', DATE_FORMAT(CURDATE(), '%d%m%Y'), '-');
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number, LENGTH(invoice_prefix) + 1) AS UNSIGNED)) + 1, 1)
    INTO invoice_sequence
    FROM transactions
    WHERE invoice_number LIKE CONCAT(invoice_prefix, '%')
        AND DATE(created_at) = CURDATE();
    
    SET NEW.invoice_number = CONCAT(invoice_prefix, LPAD(invoice_sequence, 3, '0'));
END$$

DELIMITER ;
