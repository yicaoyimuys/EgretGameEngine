type Long = protobuf.Long;

/** Namespace simple. */
declare namespace simple {

    /** Properties of a Person. */
    interface IPerson {

        /** Person name */
        name: string;

        /** Person address */
        address: string;

        /** Person phoneNumber */
        phoneNumber: string;

        /** Person age */
        age: number;

        /** Person location */
        location?: (simple.ILocation|null);
    }

    /** Represents a Person. */
    class Person implements IPerson {

        /**
         * Constructs a new Person.
         * @param [properties] Properties to set
         */
        constructor(properties?: simple.IPerson);

        /** Person name. */
        public name: string;

        /** Person address. */
        public address: string;

        /** Person phoneNumber. */
        public phoneNumber: string;

        /** Person age. */
        public age: number;

        /** Person location. */
        public location?: (simple.ILocation|null);

        /**
         * Creates a new Person instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Person instance
         */
        public static create(properties?: simple.IPerson): simple.Person;

        /**
         * Encodes the specified Person message. Does not implicitly {@link simple.Person.verify|verify} messages.
         * @param message Person message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: simple.IPerson, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Person message, length delimited. Does not implicitly {@link simple.Person.verify|verify} messages.
         * @param message Person message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: simple.IPerson, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Person message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): simple.Person;

        /**
         * Decodes a Person message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): simple.Person;

        /**
         * Verifies a Person message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Person message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Person
         */
        public static fromObject(object: { [k: string]: any }): simple.Person;

        /**
         * Creates a plain object from a Person message. Also converts values to other types if specified.
         * @param message Person
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: simple.Person, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Person to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Location. */
    interface ILocation {

        /** Location region */
        region: string;

        /** Location country */
        country: string;
    }

    /** Represents a Location. */
    class Location implements ILocation {

        /**
         * Constructs a new Location.
         * @param [properties] Properties to set
         */
        constructor(properties?: simple.ILocation);

        /** Location region. */
        public region: string;

        /** Location country. */
        public country: string;

        /**
         * Creates a new Location instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Location instance
         */
        public static create(properties?: simple.ILocation): simple.Location;

        /**
         * Encodes the specified Location message. Does not implicitly {@link simple.Location.verify|verify} messages.
         * @param message Location message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: simple.ILocation, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Location message, length delimited. Does not implicitly {@link simple.Location.verify|verify} messages.
         * @param message Location message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: simple.ILocation, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Location message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Location
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): simple.Location;

        /**
         * Decodes a Location message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Location
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): simple.Location;

        /**
         * Verifies a Location message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Location
         */
        public static fromObject(object: { [k: string]: any }): simple.Location;

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @param message Location
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: simple.Location, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Location to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a user_login_c2s. */
    interface Iuser_login_c2s {

        /** user_login_c2s accid */
        accid: number;

        /** user_login_c2s tstamp */
        tstamp: number;

        /** user_login_c2s ticket */
        ticket: string;
    }

    /** Represents a user_login_c2s. */
    class user_login_c2s implements Iuser_login_c2s {

        /**
         * Constructs a new user_login_c2s.
         * @param [properties] Properties to set
         */
        constructor(properties?: simple.Iuser_login_c2s);

        /** user_login_c2s accid. */
        public accid: number;

        /** user_login_c2s tstamp. */
        public tstamp: number;

        /** user_login_c2s ticket. */
        public ticket: string;

        /**
         * Creates a new user_login_c2s instance using the specified properties.
         * @param [properties] Properties to set
         * @returns user_login_c2s instance
         */
        public static create(properties?: simple.Iuser_login_c2s): simple.user_login_c2s;

        /**
         * Encodes the specified user_login_c2s message. Does not implicitly {@link simple.user_login_c2s.verify|verify} messages.
         * @param message user_login_c2s message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: simple.Iuser_login_c2s, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified user_login_c2s message, length delimited. Does not implicitly {@link simple.user_login_c2s.verify|verify} messages.
         * @param message user_login_c2s message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: simple.Iuser_login_c2s, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a user_login_c2s message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns user_login_c2s
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): simple.user_login_c2s;

        /**
         * Decodes a user_login_c2s message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns user_login_c2s
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): simple.user_login_c2s;

        /**
         * Verifies a user_login_c2s message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a user_login_c2s message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns user_login_c2s
         */
        public static fromObject(object: { [k: string]: any }): simple.user_login_c2s;

        /**
         * Creates a plain object from a user_login_c2s message. Also converts values to other types if specified.
         * @param message user_login_c2s
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: simple.user_login_c2s, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this user_login_c2s to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a user_login_s2c. */
    interface Iuser_login_s2c {

        /** user_login_s2c flag */
        flag: number;
    }

    /** Represents a user_login_s2c. */
    class user_login_s2c implements Iuser_login_s2c {

        /**
         * Constructs a new user_login_s2c.
         * @param [properties] Properties to set
         */
        constructor(properties?: simple.Iuser_login_s2c);

        /** user_login_s2c flag. */
        public flag: number;

        /**
         * Creates a new user_login_s2c instance using the specified properties.
         * @param [properties] Properties to set
         * @returns user_login_s2c instance
         */
        public static create(properties?: simple.Iuser_login_s2c): simple.user_login_s2c;

        /**
         * Encodes the specified user_login_s2c message. Does not implicitly {@link simple.user_login_s2c.verify|verify} messages.
         * @param message user_login_s2c message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: simple.Iuser_login_s2c, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified user_login_s2c message, length delimited. Does not implicitly {@link simple.user_login_s2c.verify|verify} messages.
         * @param message user_login_s2c message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: simple.Iuser_login_s2c, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a user_login_s2c message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns user_login_s2c
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): simple.user_login_s2c;

        /**
         * Decodes a user_login_s2c message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns user_login_s2c
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): simple.user_login_s2c;

        /**
         * Verifies a user_login_s2c message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a user_login_s2c message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns user_login_s2c
         */
        public static fromObject(object: { [k: string]: any }): simple.user_login_s2c;

        /**
         * Creates a plain object from a user_login_s2c message. Also converts values to other types if specified.
         * @param message user_login_s2c
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: simple.user_login_s2c, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this user_login_s2c to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a user_register_c2s. */
    interface Iuser_register_c2s {

        /** user_register_c2s userName */
        userName: string;
    }

    /** Represents a user_register_c2s. */
    class user_register_c2s implements Iuser_register_c2s {

        /**
         * Constructs a new user_register_c2s.
         * @param [properties] Properties to set
         */
        constructor(properties?: simple.Iuser_register_c2s);

        /** user_register_c2s userName. */
        public userName: string;

        /**
         * Creates a new user_register_c2s instance using the specified properties.
         * @param [properties] Properties to set
         * @returns user_register_c2s instance
         */
        public static create(properties?: simple.Iuser_register_c2s): simple.user_register_c2s;

        /**
         * Encodes the specified user_register_c2s message. Does not implicitly {@link simple.user_register_c2s.verify|verify} messages.
         * @param message user_register_c2s message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: simple.Iuser_register_c2s, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified user_register_c2s message, length delimited. Does not implicitly {@link simple.user_register_c2s.verify|verify} messages.
         * @param message user_register_c2s message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: simple.Iuser_register_c2s, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a user_register_c2s message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns user_register_c2s
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): simple.user_register_c2s;

        /**
         * Decodes a user_register_c2s message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns user_register_c2s
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): simple.user_register_c2s;

        /**
         * Verifies a user_register_c2s message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a user_register_c2s message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns user_register_c2s
         */
        public static fromObject(object: { [k: string]: any }): simple.user_register_c2s;

        /**
         * Creates a plain object from a user_register_c2s message. Also converts values to other types if specified.
         * @param message user_register_c2s
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: simple.user_register_c2s, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this user_register_c2s to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a user_register_s2c. */
    interface Iuser_register_s2c {

        /** user_register_s2c flag */
        flag: number;
    }

    /** Represents a user_register_s2c. */
    class user_register_s2c implements Iuser_register_s2c {

        /**
         * Constructs a new user_register_s2c.
         * @param [properties] Properties to set
         */
        constructor(properties?: simple.Iuser_register_s2c);

        /** user_register_s2c flag. */
        public flag: number;

        /**
         * Creates a new user_register_s2c instance using the specified properties.
         * @param [properties] Properties to set
         * @returns user_register_s2c instance
         */
        public static create(properties?: simple.Iuser_register_s2c): simple.user_register_s2c;

        /**
         * Encodes the specified user_register_s2c message. Does not implicitly {@link simple.user_register_s2c.verify|verify} messages.
         * @param message user_register_s2c message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: simple.Iuser_register_s2c, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified user_register_s2c message, length delimited. Does not implicitly {@link simple.user_register_s2c.verify|verify} messages.
         * @param message user_register_s2c message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: simple.Iuser_register_s2c, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a user_register_s2c message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns user_register_s2c
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): simple.user_register_s2c;

        /**
         * Decodes a user_register_s2c message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns user_register_s2c
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): simple.user_register_s2c;

        /**
         * Verifies a user_register_s2c message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a user_register_s2c message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns user_register_s2c
         */
        public static fromObject(object: { [k: string]: any }): simple.user_register_s2c;

        /**
         * Creates a plain object from a user_register_s2c message. Also converts values to other types if specified.
         * @param message user_register_s2c
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: simple.user_register_s2c, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this user_register_s2c to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
